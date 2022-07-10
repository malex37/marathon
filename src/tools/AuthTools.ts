import { AppConfig } from "../environment";

export function setToken(token: string): void {
  localStorage.setItem(AppConfig.identityTokenStorageKey, token);
}

export function getToken(): string | undefined {
  console.log('AppConfig.identityTokenStorageKey', AppConfig.identityTokenStorageKey)
  return localStorage.getItem(AppConfig.identityTokenStorageKey) || undefined;
}

export function checkAuth(): void { 
  if (!getToken() && !AppConfig.disableLoginForDevelopment) {
    console.log('No cognito token detected');
    window.location.assign(AppConfig.loginUrl);
  }
}