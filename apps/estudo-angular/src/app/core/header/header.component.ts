import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
import { User } from '../user/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class HeaderComponent implements OnInit {
  private user$!: Observable<User>;
  user!: User;

  constructor( private userService: UserService) {
    this.user$ = this.userService.getUser();
    this.user$.subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {

  }
}
