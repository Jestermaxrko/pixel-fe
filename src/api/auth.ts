import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../environments/environment';

const getHeaders = () => {
  const headers = { 'Client-Device': 'web', 'Content-Type': 'application/json' };
  let userToken;
  userToken = window.localStorage.getItem('authToken');
  if (userToken) { headers['Authorization'] = userToken ? `Bearer ${userToken}` : ''; }
  return headers;
};

@Injectable()
export class AuthApi {
  constructor(private http: HttpClient) {}

  signUp = (email: string, nickname: string, password: string, passwordConf: string): Observable<Object> => {
    return this.http.post(`${env.host}:${env.port}/register`, { email, nickname, password, passwordConf }, { headers: getHeaders() });
  }

  verifyEmail = (hash: string): Observable<Object> => this.http.get(`${env.host}:${env.port}/verify${hash}`);

  signIn = (email: string, password: string): Observable<Object> => {
    return this.http.post(`${env.host}:${env.port}/login`, { email, password }, { headers: getHeaders() });
  }

  validateToken = (): Observable<Object> => this.http.get(`${env.host}:${env.port}/validate-token`, { headers : getHeaders() });

  signOut = (): Observable<Object> => this.http.get(`${env.host}:${env.port}/logout`, { headers : getHeaders() });
}
