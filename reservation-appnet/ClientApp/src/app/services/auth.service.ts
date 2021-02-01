import {Injectable} from "@angular/core";

export interface User {
  Id?: number;
  Name: string;
}

@Injectable()
export class AuthService {
  public setUser(user: User) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(): User {
    const user = sessionStorage.getItem('user');
    return JSON.parse(user);
  }
}