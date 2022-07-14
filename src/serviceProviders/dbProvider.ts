import { BatchGetItemCommand, DynamoDBClient, QueryCommand, ScanCommand } from "@aws-sdk/client-dynamodb"
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { AppConfig } from "../environment";
import { getToken } from "../tools/AuthTools";
import { logger } from "../tools/logger";
import { SprintModel } from '../models/SprintModel';
import { Team } from "../models/Team";


export default class DbProvider {
  private static dbClient: DynamoDBClient;

  public static init() {
    const identityToken = getToken();
    if (!identityToken) {
      throw Error('Failed to initialize client, no token present');
    }
    const loginMapKey = `cognito-idp.${AppConfig.awsRegion}.amazonaws.com/${AppConfig.userPoolId}`;
    logger.info(`Initializing client with identityPoolId: ${AppConfig.identityPoolId}. IdentityToken: ${identityToken} and loginMapKey ${loginMapKey}`);
    DbProvider.dbClient = new DynamoDBClient({
      region: 'us-west-2',
      credentials: fromCognitoIdentityPool({
        identityPoolId: AppConfig.identityPoolId,
        logins: {
          'cognito-idp.us-east-1.amazonaws.com/us-east-1_FU9OU6fgv': identityToken,
        },
        clientConfig: {
          region: AppConfig.awsRegion,
        }
      }),
    });
  }

  public static async getSprints(): Promise<SprintModel[] | undefined> {
    if (!DbProvider.dbClient) {
      DbProvider.init();
    }

    const getSprintsCommand: ScanCommand = new ScanCommand({
      TableName: 'sprints'
    });
    try {
      const results = await DbProvider.dbClient.send(getSprintsCommand);
      return results.Items?.map(item => {
        return { name: item.sprint.S, team: item.team.S, projectName: item.projectName.S, totalPoints: item.totalPoints.N, completedPoints: item.completedPoints.N };
      });
    } catch (exception) {
      logger.info(`Error fetching sprint data: ${JSON.stringify(exception)}`);
      throw new Error('Failed aws request');
    }
  }

  public static async getTeam(teamName: string): Promise<Team> {
    if (!DbProvider.dbClient) {
      DbProvider.init();
    }
    try {
      const getTeamCommand: QueryCommand = new QueryCommand({
        KeyConditionExpression: "#team_name = :inputName",
        TableName: 'sprint-teams',
        ExpressionAttributeValues: {
          ":inputName": { S: teamName }
        },
        ExpressionAttributeNames: {"#team_name": "name"}
      });
      const results = await DbProvider.dbClient.send(getTeamCommand);
      if (!results.Items && !results.Items) {
        return { members: [] }
      }
        return results.Items.map((element) => {
          if (element.members.SS) { 
            return ({ members: element.members.SS} as Team);
          }
          return { members: [] };
        });
    } catch (exception) {
      throw new Error('Failed dynamo db fetch')
    }
  }
}
