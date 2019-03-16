import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = 'http://localhost:3000/auth/register';

  constructor(
    private http: HttpClient
  ) { }

  private handleError(error: any) {
    console.error('An error occurred!', error);
    return (error.message || error);
  }

  register(user: any): Promise<any> {
    return this.http.post(this.apiUrl, user, headers).toPromise();
  }
}
