import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../environments/environment';
import { HttpService } from '../services/http.service';

@Injectable()
export class UsersApi {
  constructor(
    private http: HttpClient,
    private httpService: HttpService) {
  }

  follow = (data: object): Observable<Object> => {
    return this.http.patch(`${env.host}:${env.port}/followings/follow`, data, { headers: this.httpService.getHeaders() });
  }

  unfollow = (data: object): Observable<Object> => {
    return this.http.patch(`${env.host}:${env.port}/followings/unfollow`, data, { headers: this.httpService.getHeaders() });
  }

  getProfile = (nickname: string): Observable<Object> => {
    return this.http.get(`${env.host}:${env.port}/profile/get-profile/${nickname}`, { headers: this.httpService.getHeaders() });
  }
}
