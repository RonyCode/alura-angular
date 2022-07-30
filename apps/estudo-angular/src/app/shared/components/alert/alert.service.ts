import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Alert, AlertType } from './alert';
import { NavigationStart, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alertSubject: Subject<Alert | null> = new Subject<Alert | null>();
  keepAfterRouteChange = false;
  constructor(router: Router) {
    router.events.subscribe({
      next: (event) => {
        if (event instanceof NavigationStart) {
          if (this.keepAfterRouteChange) {
            this.keepAfterRouteChange = false;
          } else {
            this.clear();
          }
        }
      },
    });
  }

  success(message: string, keepAfterRouteChange: boolean = false) {
    this.alert(AlertType.SUCCESS, message, keepAfterRouteChange);
  }
  warning(message: string, keepAfterRouteChange: boolean = false) {
    this.alert(AlertType.WARNING, message, keepAfterRouteChange);
  }
  danger(message: string, keepAfterRouteChange: boolean = false) {
    this.alert(AlertType.DANGER, message, keepAfterRouteChange);
  }
  info(message: string, keepAfterRouteChange: boolean = false) {
    this.alert(AlertType.INFO, message, keepAfterRouteChange);
  }

  private alert(
    alertype: AlertType,
    message: string,
    keepAfterRouteChange: boolean
  ) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.alertSubject.next(new Alert(alertype, message));
  }

  getAlert() {
    return this.alertSubject.asObservable();
  }

  clear() {
    this.alertSubject.next(null);
  }
}
