import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  getHeaders = () => {
    const headers = { 'Client-Device': 'web', 'Content-Type': 'application/json' };
    let userToken;
    userToken = window.localStorage.getItem('authToken');
    if (userToken) { headers['Authorization'] = userToken ? `Bearer ${userToken}` : ''; }
    return headers;
  }
}
