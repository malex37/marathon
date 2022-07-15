import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';
import { AppConfig } from '../environment';

class CredentialsProvider {

  private static cognitoIdentity: CognitoIdentityProviderClient;
  private static token?: string;

  constructor() {
    CredentialsProvider.cognitoIdentity = new CognitoIdentityProviderClient({
      region: AppConfig.awsRegion,
      apiVersion: 'latest',
    });
  }

  public static updateToken(token: string): void {
    CredentialsProvider.token = token;
  }
}

export const credentialsProvider = new CredentialsProvider();