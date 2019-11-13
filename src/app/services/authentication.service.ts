import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/internal/operators/tap';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {of} from 'rxjs/internal/observable/of';
import {User} from '../models/user';
import {RegisterComponent} from '../register/register.component';


// const apiUrl = '/';
const apiUrl = 'http://localhost:8080/';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    isLoggedIn = false;
    isRegistered = false;

    constructor(private http: HttpClient) {
    }

    login(user: User): Observable<any> {
        return this.http.post<any>(apiUrl.concat('user/login'), user)
            .pipe(
                tap(_ => this.isLoggedIn = true),
                catchError(this.handleError('login', []))
            );
    }

    logout(): Observable<any> {
        return this.http.get<any>(apiUrl + 'signout')
            .pipe(
                tap(_ => this.isLoggedIn = false),
                catchError(this.handleError('logout', []))
            );
    }

    register(user: User): Observable<any> {
        return this.http.post<any>(apiUrl.concat('user/register'), user)
            .pipe(
                tap(_ => this.isRegistered = true),
                catchError(this.handleError('register', []))
            );
    }

    getUser(email: string): Observable<any> {
        return this.http.get<any>(apiUrl.concat('user/get/'.concat(email)));
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
