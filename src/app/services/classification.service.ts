import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {timeout, catchError} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/internal/operators/tap';
import {of} from 'rxjs/internal/observable/of';
import {Router} from '@angular/router';

// const apiUrl = 'http://localhost:8080/';
const apiUrl = '/';

@Injectable({
    providedIn: 'root'
})
export class ClassificationService {
    isClassified = false;
    isClassificationError = false;

    constructor(private http: HttpClient, private router: Router) {
    }

    classify(dataPath: string): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'uid': localStorage.getItem('uid')
            })
        };
        const formData = new FormData();
        formData.append('eegPath', dataPath);
        return this.http.post<any>(apiUrl.concat('classifier/predict'), formData,
            {headers: httpOptions.headers, reportProgress: true, observe: 'events'})
            .pipe(
                tap(_ => this.isClassified = true),
                catchError(err => {
                    localStorage.setItem('classifying', 'false');
                    this.router.navigate(['home']);
                    this.handleError('classification', []);
                    return of(err);
                })
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
