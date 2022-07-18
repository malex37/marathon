import { AppConfig } from '../environment';
import { logger } from './logger';

export class AuthValidator {
  public static setToken(token: string): void {
    console.log('setToken');
    localStorage.setItem(AppConfig.identityTokenStorageKey, token);
  }

  public static getToken(): string | undefined {
    console.log('getToken');
    const value = this.getStorageValue(AppConfig.identityTokenStorageKey);
    if (!value) {
      return undefined;
    } else {
      return value;
    }
  }

  public static clearAuthStorage(): void {
    console.log('clearing auth storage');
    localStorage.removeItem(AppConfig.identityTokenStorageKey);
    localStorage.removeItem(AppConfig.loginTimeKey);
    localStorage.removeItem(AppConfig.expirationTimeKey);
  }

  public static setTokenExpirationDate(expiration: number): void {
    console.log('setTokenExpirationDate');
    // expiration is returned in secondsm but Date.now() is ms
    const expirationDate = Date.now() + (expiration * 1000);
    localStorage.setItem(AppConfig.expirationTimeKey, expirationDate.toString());
  }

  private static getStorageValue(key: string): string | undefined {
    console.log('setTokenExpirationDate');
    const value = localStorage.getItem(key);
    if (!value) {
      // throw new Error(`No value for key ${key}!`);
      return undefined;
    }
    return value;
  }

  public static setLoginTime(loginTime: number): void {
    console.log('setLoginTime');
    localStorage.setItem(AppConfig.loginTimeKey, loginTime.toString());
  }

  public static getLoginTime(): number {
    console.log('getLoginTime');
    const value = this.getStorageValue(AppConfig.loginTimeKey);
    if (!value) {
      logger.error('No value found for login time');
      return 0;
    } else {
      return parseInt(value);
    }
  }

  public static getExpirationDate(): number {
    console.log('getExpirationDate');
    const value = this.getStorageValue(AppConfig.expirationTimeKey);
    if (!value) {
      logger.error('no value for expiration date');
      return 0;
    } else {
      return parseInt(value);
    }
  }

  public static checkAuth(): void {
    console.log('checkAuth');
    const checkTime = Date.now();
    let requiresReLogin = false;
    if (!this.getToken()) {
      logger.debug('No identity token detected');
      requiresReLogin = true;
    }
    if (AppConfig.disableLoginForDevelopment) {
      logger.debug('development sign in is not disabled redirecting');
      requiresReLogin = true;
    }
    if (this.getExpirationDate() < checkTime) {
      logger.debug('token is expired, loging out');
      requiresReLogin = true;
    }
    if (requiresReLogin) {
      window.location.assign(AppConfig.loginUrl);
    }
  }
}

export const AuthChecker = new AuthValidator();
