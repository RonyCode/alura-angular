import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private subJectUser = new BehaviorSubject<User>({
    id: null,
    name: null,
    email: null,
  });
  private userName!: string | null;

  constructor(private tokenService: TokenService) {
    this.tokenService.hasToken() && this.decodeAndNotify();
  }

  setToken(token: string) {
    this.tokenService.setToken(token);
    this.decodeAndNotify();
  }

  getUser() {
    return this.subJectUser.asObservable();
  }

  logOut() {
    this.tokenService.removeToken();
    this.subJectUser.next({
      id: null,
      name: null,
      email: null,
    });
  }

  isLogged() {
    return this.tokenService.hasToken();
  }

  getUserName() {
    return this.userName;
  }

  private decodeAndNotify() {
    const token = this.tokenService.getToken();
    if (token) {
      const user = jwtDecode(token) as User;
      this.userName = user.name;
      this.subJectUser.next(user);
    }
  }
}
