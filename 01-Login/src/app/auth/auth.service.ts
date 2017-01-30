import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { AUTH_CONFIG } from './auth0-variables';
import { AppConfig } from './../app.config';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class AuthService {

  lock;

  constructor(config: AppConfig) {
    const { AUTH0_CLIENT_ID, AUTH0_DOMAIN } = config.config;
    this.lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, {
      oidcConformant: true,
      autoclose: true,
      auth: {
        redirectUri: window.location.href,
        responseType: 'token id_token',
        audience: `https://${AUTH0_DOMAIN}/userinfo`
      }
    });
  }

  public login(): void {
    this.lock.show();
  }

  public handleAuthentication(): void {
    this.lock.on('authenticated', (authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setUser(authResult);
      } else if (authResult && authResult.error) {
        alert(`Error: ${authResult.error}`);
      }
    });
  }

  public isAuthenticated(): boolean {
    return tokenNotExpired();
  }

  public logout(): void {
    // Remove token from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
  }

  private setUser(authResult): void {
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
  }
}
