import { BatchGetItemCommand, DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb"
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { AppConfig } from "../environment";
import { getToken } from "../tools/AuthTools";
import { logger } from "../tools/logger";

export class DbProvider {

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
          customRoleArn: 'arn:aws:iam::490433457471:role/marathon_user_role',
          logins: {
            'cognito-idp.us-east-1.amazonaws.com/us-east-1_FU9OU6fgv': identityToken,
          },
          clientConfig: {
            region: AppConfig.awsRegion,
          }
        }),
      });
    }
    public async getSprints() {
      if(!DbProvider.dbClient) {
        DbProvider.init();
      }
        const getSprintsCommand: ScanCommand = new ScanCommand({
            TableName: 'sprints'
        });
        const results = await DbProvider.dbClient.send(getSprintsCommand);
        return results.Items?.map( item => {
            return { sprint: item.sprint.S, team: item.team.S};
        });
    }
}

export const DynamoConnector = new DbProvider();