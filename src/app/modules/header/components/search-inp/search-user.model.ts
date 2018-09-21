export class SearchUser {
  avatar: string;
  nickname: string;

  constructor(obj?: any) {
    this.avatar = obj.id;
    this.nickname = obj.nickname;
  }
}
