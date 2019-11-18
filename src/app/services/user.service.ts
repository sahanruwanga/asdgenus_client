import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';

// const apiUrl = 'http://localhost:8080/';
const apiUrl = '/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isGetUser = false;

  constructor(private http: HttpClient) { }

  getUser(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'uid': localStorage.getItem('uid')
      })
    };
    return this.http.get<any>(apiUrl + 'user/id/'.concat(localStorage.getItem('uid')),
        {headers: {'uid': localStorage.getItem('uid')}, responseType: 'json'})
        .pipe(
            tap(_ => this.isGetUser = true),
            catchError(this.handleError('Get User', []))
        );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
