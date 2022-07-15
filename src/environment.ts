interface Environment {
  loginUrl: string;
  redirectUri: string;
  identityPoolId: string;
  userPoolId: string;
  awsRegion: string;
  identityTokenStorageKey: string;
  identityClient: string;
  disableLoginForDevelopment: boolean;
  expirationTimeKey: string;
  loginTimeKey: string;
}

export const AppConfig: Environment = {
  loginUrl: 'https://marathon.auth.us-east-1.amazoncognito.com/login?response_type=token&client_id=b230eteev0qvv3r73ufhv4o3b&redirect_uri=http://localhost:3000/login&scope=openid+profile+email',
  redirectUri : 'http://localhost:3000',
  identityPoolId: 'us-east-1:e4f5c242-c421-4d05-bef1-7e95a1218a31',
  userPoolId:'us-east-1_FU9OU6fgv',
  identityClient: '54p2e979phpou3em40hvmiq4l3',
  awsRegion: 'us-east-1',
  identityTokenStorageKey: 'identityToken',
  disableLoginForDevelopment: false,
  expirationTimeKey: 'expirationTime',
  loginTimeKey: 'loginTime',
}