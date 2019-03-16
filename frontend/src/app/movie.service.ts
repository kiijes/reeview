import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Movie } from './movie';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Review } from './review';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl = 'http://localhost:3000/movie';
  constructor(
    private http: HttpClient,
    private authServ: AuthService
    ) { }

  addMovie(movie) {
    const reqHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': this.authServ.getToken()
      })
    };
    return this.http.post(this.apiUrl + '/add', movie, reqHeaders).toPromise();
  }

  editMovie(movie_id, movie) {
    const reqHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': this.authServ.getToken()
      })
    };
    return this.http.put(this.apiUrl + '/' + movie_id + '/edit', movie, reqHeaders).toPromise();
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error);
    return (error.message || error);
  }

  getMovie(id: String) {
    return this.http.get<Movie>(this.apiUrl + '/get/' + id).toPromise();
  }

  getLatest() {
    return this.http.get<Movie[]>(this.apiUrl + '/latest')
      .pipe(
        catchError(this.handleError)
      );
  }

  getAll() {
    return this.http.get<Movie[]>(this.apiUrl + '/all')
      .pipe(
        catchError(this.handleError)
      );
  }

  searchMovies(search) {
    const reqHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Movie[]>(this.apiUrl + '/search', search, reqHeaders)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteMovie(id) {
    const reqHeaders = {
      headers: new HttpHeaders({
        'x-access-token': this.authServ.getToken()
      })
    };
    return this.http.delete<Movie>(this.apiUrl + '/delete/' + id, reqHeaders).pipe(
      catchError(this.handleError)
    );
  }

  reviewMovie(id: String, review) {
    const reqHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': this.authServ.getToken()
      })
    };
    return this.http.put(this.apiUrl + '/' + id + '/review', review, reqHeaders).pipe(
      catchError(this.handleError)
    );
  }

  deleteReview(movie_id, user_id) {
    const reqHeaders = {
      headers: new HttpHeaders({
        'x-access-token': this.authServ.getToken()
      })
    };
    return this.http.delete(this.apiUrl + '/deletereview/' + movie_id + '/' + user_id, reqHeaders).pipe(
      catchError(this.handleError)
    );
  }

  getReview(movie_id, user_id) {
    const reqHeaders = {
      headers: new HttpHeaders({
        'x-access-token': this.authServ.getToken()
      })
    };
    return this.http.get<Review>(this.apiUrl + '/getreview/' + movie_id + '/' + user_id, reqHeaders)
      .toPromise();
  }

  getReviews(id: String) {
    return this.http.get(this.apiUrl + '/' + id + '/review').pipe(
      catchError(this.handleError)
    );
  }

  addOrEditComment(movie_id, comment) {
    const reqHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': this.authServ.getToken()
      })
    };
    return this.http.put(this.apiUrl + '/' + movie_id + '/comment', comment, reqHeaders).pipe(
      catchError(this.handleError)
    );
  }

  getComments(movie_id) {
    return this.http.get(this.apiUrl + '/' + movie_id + '/comment').pipe(
      catchError(this.handleError)
    );
  }

  deleteComment(comment_id, user_id) {
    const reqHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': this.authServ.getToken()
      })
    };
    return this.http.delete(this.apiUrl + '/deletecomment/' + comment_id + '/' + user_id, reqHeaders).pipe(
      catchError(this.handleError)
    );
  }

}
