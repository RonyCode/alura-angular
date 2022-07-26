import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserService } from '../user/user.service';

const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private userService: UserService) {}

  authenticate(userName: string, password: string): Observable<any> {
    return this.http
      .post(
        API_URL + '/user/login',
        { userName, password },
        { observe: 'response' }
      )
      .pipe(
        tap((res) => {
          const authToken = res.headers.get('x-access-token');
          authToken && this.userService.setToken(authToken);
          console.log(`User ${userName} authenticated with token ${authToken}`);
        })
      );
  }
}
