import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/internal/operators/tap';
import {of} from 'rxjs/internal/observable/of';
import {FormArray} from '@angular/forms';

const apiUrl = 'http://localhost:8080/';

@Injectable({
    providedIn: 'root'
})
export class ClassificationService {
    isClassified = false;
    constructor(private http: HttpClient) {
    }

    clasiify(dataPath: string): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'uid': localStorage.getItem('uid')
            })
        };
        const formData = new FormData();
        formData.append('eegPath', dataPath);
        return this.http.post<any>(apiUrl.concat('classifier/predict'), formData, httpOptions)
            .pipe(
                tap(_ => this.isClassified = true),
                catchError(this.handleError('classification', []))
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
