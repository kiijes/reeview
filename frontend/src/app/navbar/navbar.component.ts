import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnDestroy {
  admin = false;
  login = false;
  loginSubscription: Subscription;
  adminSubscription: Subscription;

  constructor(private authServ: AuthService) {
    this.loginSubscription = this.authServ.loginTrue().subscribe(message => { this.login = message; });
    this.adminSubscription = this.authServ.adminTrue().subscribe(message => { this.admin = message; });
    const atoken = this.authServ.getToken();
    if (atoken) {
      this.login = true;
      const payload = this.authServ.getPayload();
      if (payload.isAdmin) {
        this.admin = true;
      }
    } else {
      this.login = false;
    }
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
    this.adminSubscription.unsubscribe();
  }

  doLogout() {
    this.login = false;
    this.admin = false;
    this.authServ.logout();
  }

}
