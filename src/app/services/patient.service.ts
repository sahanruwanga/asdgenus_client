import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';
import {Patient} from '../models/patient';

// const apiUrl = 'http://localhost:8080/';
const apiUrl = '/';

@Injectable({
    providedIn: 'root'
})
export class PatientService {

    isGetAllPatients = false;
    isGetPatient = false;
    isAdded = false;
    isUpdated = false;
    isDeleted = false;
    isGetAllPatientIDs = false;

    constructor(private http: HttpClient) {
    }

    /**
     * Get a patient from given patient ID
     *
     * @param id
     */
    getPatient(id: number): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'uid': localStorage.getItem('uid')
            })
        };
        return this.http.get<any>(apiUrl.concat('subject/id/').concat(String(id)),
            {headers: {'uid': localStorage.getItem('uid')}, responseType: 'json'})
            .pipe(
                tap(_ => this.isGetPatient = true),
                catchError(this.handleError('Get Patient', []))
            );
    }

    /**
     * Get all patients for the current user from db
     *
     */
    getAllPatients(): Observable<any> {

        return this.http.get<any>(apiUrl + 'subject/get-all/'.concat(localStorage.getItem('uid')),
            {headers: {'uid': localStorage.getItem('uid')}, responseType: 'json'})
            .pipe(
                tap(_ => this.isGetAllPatients = true),
                catchError(this.handleError('Get All Patients', []))
            );
    }

    /**
     * Get all patient IDs for the current user from db
     *
     */
    getAllPatientIDs(): Observable<any> {

        return this.http.get<any>(apiUrl + 'subject/ids/'.concat(localStorage.getItem('uid')),
            {headers: {'uid': localStorage.getItem('uid')}, responseType: 'json'})
            .pipe(
                tap(_ => this.isGetAllPatientIDs = true),
                catchError(this.handleError('Get All Patient IDs', []))
            );
    }

    /**
     * Add new patient for the current user
     *
     * @param patient
     */
    addPatient(patient: Patient): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'uid': localStorage.getItem('uid')
            })
        };
        return this.http.post<any>(apiUrl.concat('subject/save'), patient, httpOptions)
            .pipe(
                tap(_ => this.isAdded = true),
                catchError(this.handleError('Add new Patient', []))
            );
    }

    /**
     * Update the patient with new given details
     *
     * @param patient
     */
    updatePatient(patient: Patient): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'uid': localStorage.getItem('uid')
            })
        };
        return this.http.put<any>(apiUrl.concat('subject/update/').concat(String(patient.id)),
            patient, httpOptions)
            .pipe(
                tap(_ => this.isUpdated = true),
                catchError(this.handleError('Update Patient', []))
            );
    }

    /**
     * Delete patient by giving the specific patient ID
     *
     * @param patientId
     */
    deletePatient(patientId: number): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'uid': localStorage.getItem('uid')
            })
        };
        return this.http.delete<any>(apiUrl.concat('subject/delete/').concat(String(patientId)),
            httpOptions)
            .pipe(
                tap(_ => this.isDeleted = true),
                catchError(this.handleError('Delete Patient', []))
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
