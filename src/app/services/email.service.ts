import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {User} from '../models/user';
import {Email} from '../models/email';

const apiUrl = '/';

@Injectable({
    providedIn: 'root'
})
export class EmailService {

    mailSent = false;

    constructor(private http: HttpClient) {
    }

    sendMail(email: Email): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'uid': localStorage.getItem('uid')
            })
        };
        return this.http.post<any>(apiUrl.concat('email/send'), email, httpOptions)
            .pipe(
                tap(_ => this.mailSent = true),
                catchError(this.handleError('send email', []))
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
