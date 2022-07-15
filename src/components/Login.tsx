import React, { useEffect } from "react";
import { AppConfig } from "../environment";
import DbProvider from "../serviceProviders/dbProvider";
import { AuthValidator } from "../tools/AuthTools";
import { logger } from "../tools/logger";
import CognitoProvider from '../serviceProviders/cognitoProvider';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const redirectURIWithParams = window.location.toString();
    logger.debug(`window location on login ${redirectURIWithParams}`)
    const startOfTokenParam = redirectURIWithParams.indexOf("#id_token=");
    if (startOfTokenParam < 0) {
      AuthValidator.checkAuth();
    }
    const endPosition = redirectURIWithParams.indexOf('&');
    const token = redirectURIWithParams.substring(startOfTokenParam + 10, endPosition);
    logger.info(`Found token ${token}`);
    if (!token) {
      console.log('No cognito token detected');
      window.location.assign(AppConfig.loginUrl);
      return;
    }
    const startOfExpirationParam = redirectURIWithParams.indexOf('&expires_in=');
    if (startOfExpirationParam < 0) {
      AuthValidator.checkAuth();
    }
    const endOfExpirationParam = redirectURIWithParams.indexOf('&',startOfExpirationParam + 1);
    const expirationParam = redirectURIWithParams.substring(startOfExpirationParam + 12, endOfExpirationParam);
    AuthValidator.setToken(token);
    AuthValidator.setLoginTime(Date.now());
    AuthValidator.setTokenExpirationDate(parseInt(expirationParam));
    DbProvider.init();
    CognitoProvider.init();
    // CognitoProvider.getUser();

    navigate('/');
  });

  return <div></div>;
}

export default Login;