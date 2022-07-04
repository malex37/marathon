import React from "react";
import { AppConfig } from "../environment";
import { DbProvider } from "../serviceProviders/dbProvider";
import { setToken } from "../tools/AuthTools";
import { logger } from "../tools/logger";

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
    setToken(JSON.stringify(token));
    // DbProvider.init();
  }

  render() {
    return <div></div>;
  }
}