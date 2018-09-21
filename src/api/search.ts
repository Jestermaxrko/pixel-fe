import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../environments/environment';

@Injectable()
export class SearchApi {
  constructor(
    private http: HttpClient,
  ) { }

  searchUsers = (): Observable<Object> => this.http.post(`${env.host}:${env.port}/search`, null);
}
