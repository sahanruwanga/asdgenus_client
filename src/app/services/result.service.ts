import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/internal/operators/tap';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {of} from 'rxjs/internal/observable/of';
import {Eeg} from '../models/eeg';
import {Result} from '../models/result';
import {ResultSubject} from '../models/result-subject';

// const apiUrl = 'http://localhost:8080/';
const apiUrl = '/';

@Injectable({
    providedIn: 'root'
})
export class ResultService {

    isGetAllResults = false;
    isAdded = false;
    isDeleted = false;
    isAddedForSubject = false;
    isGetAllResultsForSubject = false;

    constructor(private http: HttpClient) {
    }

    getAllResults(): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'uid': localStorage.getItem('uid')
            })
        };
        return this.http.get<any>(apiUrl.concat('result/get-all/')
            .concat(localStorage.getItem('uid')), httpOptions)
            .pipe(
                tap(_ => this.isGetAllResults = true),
                catchError(this.handleError('get all results', []))
            );
    }

    getAllResultsForSubject(subjectId: number): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'uid': localStorage.getItem('uid')
            })
        };
        return this.http.get<any>(apiUrl.concat('result/get-all-subject/')
            .concat(String(subjectId)), httpOptions)
            .pipe(
                tap(_ => this.isGetAllResultsForSubject = true),
                catchError(this.handleError('get all results for subject', []))
            );
    }

    addForExistingSubject(resultSubject: ResultSubject): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'uid': localStorage.getItem('uid')
            })
        };
        return this.http.post<any>(apiUrl.concat('result/save-for-subject'), resultSubject, httpOptions)
            .pipe(
                tap(_ => this.isAddedForSubject = true),
                catchError(this.handleError('Adding new Result', []))
            );
    }

    deleteResult(resultId: number): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'uid': localStorage.getItem('uid')
            })
        };
        return this.http.delete<any>(apiUrl.concat('result/delete/').concat(String(resultId)), httpOptions)
            .pipe(
                tap(_ => this.isDeleted = true),
                catchError(this.handleError('Deleting', []))
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
