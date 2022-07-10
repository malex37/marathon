import React from "react";
import { AppConfig } from "../environment";
import DbProvider from "../serviceProviders/dbProvider";
import { setToken } from "../tools/AuthTools";
import { logger } from "../tools/logger";
import CognitoProvider from '../serviceProviders/cognitoProvider';

export default class Login extends React.Component<{}, {}> {
  componentDidMount() {
    const cognitoToken = window.location.toString();
    const startOfTokenParam = cognitoToken.indexOf("#id_token=");
    const endPosition = cognitoToken.indexOf('&');
    const token = cognitoToken.substring(startOfTokenParam + 10, endPosition);
    logger.info(`Found token ${token}`);
    if (!token) {
      console.log('No cognito token detected');
      window.location.assign(AppConfig.loginUrl);
      return;
    }
    setToken(token);
    DbProvider.init();
    CognitoProvider.init();
    CognitoProvider.getUser();
  }

  render() {
    return <div></div>;
  }
}