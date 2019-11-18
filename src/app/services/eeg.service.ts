import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/internal/operators/tap';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {of} from 'rxjs/internal/observable/of';
import {Eeg} from '../models/eeg';

// const apiUrl = 'http://localhost:8080/';
const apiUrl = '/';

@Injectable({
    providedIn: 'root'
})
export class EegService {

    isGetAllEEGs = false;
    isAdded = false;
    isDeleted = false;

    constructor(private http: HttpClient) {
    }

    getAllEEGs(): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'uid': localStorage.getItem('uid')
            })
        };
        return this.http.get<any>(apiUrl.concat('eeg-data/get-all/')
            .concat(localStorage.getItem('uid')), httpOptions)
            .pipe(
                tap(_ => this.isGetAllEEGs = true),
                catchError(this.handleError('get all EEGs', []))
            );
    }

    getAllEEGsForSubject(subjectId: number): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'uid': localStorage.getItem('uid')
            })
        };
        return this.http.get<any>(apiUrl.concat('eeg-data/get-all/')
            .concat(localStorage.getItem('uid')), httpOptions)
            .pipe(
                tap(_ => this.isGetAllEEGs = true),
                catchError(this.handleError('get all EEGs', []))
            );
    }

    addEEG(eeg: Eeg): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'uid': localStorage.getItem('uid')
            })
        };
        return this.http.post<any>(apiUrl.concat('eeg-data/save'), eeg, httpOptions)
            .pipe(
                tap(_ => this.isAdded = true),
                catchError(this.handleError('Adding', []))
            );
    }

    deleteEEG(eegId: number): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'uid': localStorage.getItem('uid')
            })
        };
        return this.http.delete<any>(apiUrl.concat('eeg-data/delete/').concat(String(eegId)), httpOptions)
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
