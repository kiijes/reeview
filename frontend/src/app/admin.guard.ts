import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private authServ: AuthService
  ) { }

  canActivate() {
    if (!this.authServ.isAdmin()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  canActivateChild() {
    if (!this.authServ.isAdmin()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
