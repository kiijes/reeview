import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/auth/login';
  public token: string;
  private jwtHelp = new JwtHelperService();
  private loginSubject = new Subject<any>();
  private adminSubject = new Subject<any>();
  private name: string;

  constructor(private http: HttpClient) {
    const currentUser = JSON.parse(sessionStorage.getItem('x-access-token'));
    this.token = currentUser && currentUser.token;
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post(this.apiUrl, { email: email, password: password })
    .pipe(map((res) => {
      console.log(res);

      const token = res['token'];
      if (token) {
        this.token = token;

        try {
          const payload = this.jwtHelp.decodeToken(token);

          if (payload.email === email && payload.isRegistered === true) {
            sessionStorage.setItem('x-access-token', JSON.stringify({ name: payload.name, token: token }));
            this.loginTrue();
            if (payload.isAdmin === true) {
              this.adminTrue();
            }
            return true;
          } else {
            return false;
          }
        } catch (err) {
          return false;
        }
      }
    }));
  }

  loginTrue(): Observable<any> {
    this.loginSubject.next(true);
    return this.loginSubject.asObservable();
  }

  adminTrue(): Observable<any> {
    const payload = this.jwtHelp.decodeToken(this.token);
    if (!payload) {
      this.adminSubject.next(false);
      return this.adminSubject.asObservable();
    }
    this.adminSubject.next(payload.isAdmin);
    return this.adminSubject.asObservable();
  }

  logout(): void {
    this.token = null;
    sessionStorage.removeItem('x-access-token');
  }

  isAdmin(): boolean {
    if (this.token) {
      const payload = this.getPayload();
      return payload.isAdmin;
    } else {
      return false;
    }
  }

  getName(): string {
    const payload = this.getPayload();
    return payload.name;
  }

  getToken(): string {
    return this.token;
  }

  getId(): string {
    const payload = this.getPayload();
    return payload.user_id;
  }

  getPayload() {
    if (!this.token) {
      return '';
    }
    const payload = this.jwtHelp.decodeToken(this.token);
    return payload;
  }
}
