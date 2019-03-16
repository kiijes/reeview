import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  error: String;
  isError: Boolean = false;

  constructor(
    private regServ: RegisterService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onSubmit(formData) {
    if (formData.username.length > 20 || formData.username.length < 3) {
      this.isError = true;
      this.error = 'Username is too short or long';
      return;
    }

    if (formData.email.length > 50) {
      this.isError = true;
      this.error = 'Email is too long';
      return;
    }

    if (formData.password.length > 128 || formData.password.length < 3) {
      this.isError = true;
      this.error = 'Password is too short or long';
      return;
    }

    this.regServ.register({
      'username': formData.username.trim(),
      'email': formData.email.trim(),
      'password': formData.password.trim(),
      'isRegistered': true,
      'isAdmin': false
    }).then((data: any) => {
      this.router.navigate(['/']);
    }).catch((error: any) => {
      this.isError = true;
      this.error = error.error.message;
      console.log(error.error.message);
    });
  }

}
