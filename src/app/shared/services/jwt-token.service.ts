import { Injectable } from '@angular/core';


const TOKEN_KEY = 'jwt_token';


@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {

  constructor() { }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  public removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }
}
