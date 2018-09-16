import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const getHeaders = () => {
  const headers = {'Client-Device': 'web', 'Content-Type': 'application/json'};
  let userToken;
  userToken = window.localStorage.getItem('authToken');
  if (userToken) { headers['Authorization'] = userToken ? `Bearer ${userToken}` : ''; }
  return headers;
};

@Injectable()

export class AuthApi {
  constructor(private http: HttpClient) {}
  authUser = (email: string, password: string) => {
    return this.http.post('http://localhost:3000/login', { email, password });
  }

  validateToken = () => {
    return this.http.get('http://localhost:3000/validate-token', { headers : getHeaders() });
  }
}
