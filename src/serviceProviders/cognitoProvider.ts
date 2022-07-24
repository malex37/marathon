import { CognitoIdentityProviderClient, GetUserCommand  } from  '@aws-sdk/client-cognito-identity-provider';
import { AppConfig } from '../environment';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';
import { AuthValidator } from '../tools/AuthTools';
import { logger } from '../tools/logger';

export default class CognitoProvider {
  private static cognitoClient: CognitoIdentityProviderClient;

  public static init() {
    const identityToken = AuthValidator.getToken();
    if (!identityToken) {
      throw Error('Failed to initialize client, no token present');
    }

    logger.info(`Initializing CongnitoIdentity client with identityPoolId: ${AppConfig.identityPoolId}. IdentityToken: ${identityToken} and awsRegion: ${AppConfig.awsRegion}`);
    this.cognitoClient = new CognitoIdentityProviderClient({ 
      region: AppConfig.awsRegion,
      credentials: fromCognitoIdentityPool({
        identityPoolId: AppConfig.identityPoolId,
        logins: {
          'cognito-idp.us-east-1.amazonaws.com/us-east-1_FU9OU6fgv': identityToken,
        },
        customRoleArn: 'arn:aws:iam::490433457471:role/marathon_user_role',
        clientConfig: {
          region: AppConfig.awsRegion,
        }
      }),
    });
  }

  public static async getUser() {
    const accessToken = AuthValidator.getToken();
    logger.debug(`token: ${accessToken}` || 'No token');
    const getUserCommand = new GetUserCommand({AccessToken: accessToken});
    const res = await this.cognitoClient.send(getUserCommand);
    logger.info(`Got response ${JSON.stringify(res)}`);
  }
}