import { DynamoDBClient, QueryCommand, ScanCommand } from '@aws-sdk/client-dynamodb';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';
import { AppConfig } from '../environment';
import { AuthValidator } from '../tools/AuthTools';
import { logger } from '../tools/logger';
import { SprintModel } from '../models/SprintModel';
import { Team } from '../models/Team';


export default class DbProvider {
  private static dbClient: DynamoDBClient;

  public static init() {
    const identityToken = AuthValidator.getToken();
    if (!identityToken) {
      throw Error('Failed to initialize client, no token present');
    }
    const loginMapKey = `cognito-idp.${AppConfig.awsRegion}.amazonaws.com/${AppConfig.userPoolId}`;
    logger.info(`Initializing client with identiyPoolId: ${AppConfig.identityPoolId}. IdentityToken: ${identityToken} and loginMapKey ${loginMapKey}`);
    const identityPoolCredentials = fromCognitoIdentityPool({
      identityPoolId: AppConfig.identityPoolId,
      logins: {
        'cognito-idp.us-east-1.amazonaws.com/us-east-1_FU9OU6fgv': identityToken,
      },
      clientConfig: {
        region: AppConfig.awsRegion,
      },
    });
    // AuthValidator.setIdentityPoolCredentials(identityPoolCredentials);
    DbProvider.dbClient = new DynamoDBClient({
      region: 'us-west-2',
      credentials: identityPoolCredentials,
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
        KeyConditionExpression: '#team_name = :inputName',
        TableName: 'sprint-teams',
        ExpressionAttributeValues: {
          ':inputName': { S: teamName }
        },
        ExpressionAttributeNames: {'#team_name': 'name'}
      });
      const results = await DbProvider.dbClient.send(getTeamCommand);
      if (!results.Items && !results.Items) {
        return { members: [] };
      }
      const membs = results.Items.map(record => record.members.SS).flat();
      logger.debug(`members are ${JSON.stringify(membs)}`);
      return { members: membs };
    } catch (exception) {
      throw new Error('Failed dynamo db fetch');
    }
  }
}
