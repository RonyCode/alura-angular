import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user';
import jtw_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>({
    id: null,
    name: null,
    email: null
  });

  constructor(private tokenService: TokenService) {
    this.tokenService.hasToken() && this.decodeAndNotify();
  }

  setToken(token: string) {
    this.tokenService.setToken(token);
    this.decodeAndNotify();
  }

  private decodeAndNotify() {
    const token = this.tokenService.getToken();
    if (token) {
      const user = jtw_decode(token) as User;
      this.userSubject.next(user);
    }
  }

  getUser() {
    return this.userSubject as Observable<User>;
  }
}
