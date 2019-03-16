import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginError = '';

  constructor(
    private authServ: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    this.loginError = '';
    this.authServ.logout();
  }

  onSubmit(formData) {
    if (
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      this.loginError = 'Email or password fields can\'t be empty';
      return;
    }
    this.authServ.login(formData.email.trim(), formData.password.trim())
    .subscribe(result => {
      if (result === true) {
        this.router.navigate(['/']);
      }
    });
  }
}
