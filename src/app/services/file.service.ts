import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {FormArray} from '@angular/forms';
import {Observable} from 'rxjs';

const apiUrl = 'http://localhost:8080/';

@Injectable({
    providedIn: 'root'
})
export class FileService {

    constructor(private http: HttpClient) {
    }

    upload(files: File[]) {
      const httpOptions = {
        headers: new HttpHeaders({
          'uid':  localStorage.getItem('uid')
        })
      };

      const formData = new FormData();
      for (let file of files) {
        formData.append('files', file);
      }
      this.http.post(apiUrl.concat('eeg-data/upload'), formData, httpOptions).subscribe(res => {
        console.log(res);
      });
    }
}
