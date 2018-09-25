import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../environments/environment';
import { HttpService } from '../services/http.service';

@Injectable()
export class AuthApi {
  constructor(
    private http: HttpClient,
    private httpService: HttpService) {
  }

  signUp = (email: string, nickname: string, password: string, passwordConf: string): Observable<Object> => {
    return this.http.post(
      `${env.host}:${env.port}/register`,
      { email, nickname, password, passwordConf },
      { headers: this.httpService.getHeaders() },
    );
  }

  verifyEmail = (hash: string): Observable<Object> => this.http.get(`${env.host}:${env.port}/verify${hash}`);

  signIn = (email: string, password: string): Observable<Object> => {
    return this.http.post(
      `${env.host}:${env.port}/login`,
      { email, password },
      { headers: this.httpService.getHeaders() },
    );
  }

  validateToken = (): Observable<Object> => this.http.get(
    `${env.host}:${env.port}/validate-token`,
    { headers : this.httpService.getHeaders(),
    })

  signOut = (): Observable<Object> => this.http.get(`${env.host}:${env.port}/logout`, { headers : this.httpService.getHeaders() });
}
