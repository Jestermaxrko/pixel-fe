import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../environments/environment';

const getHeaders = () => {
  const headers = { 'Client-Device': 'web', 'Content-Type': 'application/json' };
  let userToken: string;
  userToken = window.localStorage.getItem('authToken');
  if (userToken) { headers['Authorization'] = userToken ? `Bearer ${userToken}` : ''; }
  return headers;
};

@Injectable()
export class PostsApi {
  constructor(private http: HttpClient) {}

  likePost = (postId: string, userId: string, type: string): Observable<any> => {
    return this.http.patch(`${env.host}:${env.port}/${type}-post`, { postId, userId }, { headers: getHeaders() });
  }

  commentPost = (postId: string, userNickname: string, userAvatar: string, comment: string): Observable<any> => {
    return this.http.patch(
      `${env.host}:${env.port}/comment-post`,
      { postId, userNickname, userAvatar, comment }, { headers: getHeaders() },
    );
  }
}
