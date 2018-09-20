import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  authUser = (email: string, password: string) => {
    return this.http.post(`${env.host}:${env.port}/login`, { email, password });
  }

  validateToken = () => {
    return this.http.get(`${env.host}:${env.port}/validate-token`, { headers : getHeaders() });
  }
}
