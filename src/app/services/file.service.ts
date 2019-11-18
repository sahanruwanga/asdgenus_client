import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpEventType} from '@angular/common/http';
import {FormArray} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

// const apiUrl = 'http://localhost:8080/';
const apiUrl = '/';

@Injectable({
    providedIn: 'root'
})
export class FileService {

    isUploaded = false;

    constructor(private http: HttpClient) {
    }

    /**
     * Upload EEG file
     *
     * @param files
     */
    uploadEEG(files: File[]): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'uid': localStorage.getItem('uid')
            })
        };

        const formData = new FormData();
        for (const file of files) {
            formData.append('files', file);
        }
        return this.http.post<any>(apiUrl.concat('eeg-data/upload'), formData,
            {headers: httpOptions.headers, reportProgress: true, observe: 'events'})
            .pipe(
                tap(_ => this.isUploaded = true),
                catchError(this.handleError('Upload EEG', []))
            );
    }

    /**
     * Handle the error if exist
     *
     * @param operation
     * @param result
     */
    private handleError<T>(operation = 'operation', result?: T) {

        return (error: any): Observable<T> => {
            console.error(error); // log to console instead
            this.log(`${operation} failed: ${error.message}`);

            return of(result as T);
        };
    }

    /**
     * Log the message
     *
     * @param message
     */
    private log(message: string) {
        console.log(message);
    }
}
