import {Component, OnInit} from '@angular/core';
import {FileService} from '../services/file.service';
import {ClassificationService} from '../services/classification.service';
import {Result} from '../models/result';
import {NavigationExtras, Router} from '@angular/router';
import {Eeg} from '../models/eeg';
import {HttpEventType} from '@angular/common/http';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    files: File[];
    isSelectionValid = false;
    isUploadSuccess = false;
    isClassifyButtonShow = false;
    vhdrOk = false;
    eegOk = false;
    vmrkOk = false;
    eegPath: string;
    eegName: string;
    vhdrName: string;
    vmrkName: string;
    eeg: Eeg;
    newResult: Result;
    eegSignalLocation: string;
    isResultLoading = false;
    isUploading = false;
    uploadingPercentage: number;

    constructor(private fileService: FileService,
                private classificationService: ClassificationService,
                private router: Router) {
        this.files = [];
        if (localStorage.getItem('uid') === '0') {
            this.router.navigate(['login']);
        }

        if (localStorage.getItem('classifying') === 'false') {
            this.isResultLoading = false;
        } else if (localStorage.getItem('classifying') === 'true') {
            this.isResultLoading = true;
        }
    }

    ngOnInit() {
    }

    onFilesAdded(event) {

        this.unSetFiles();
        this.files = event.target.files;
        // let contain = false;
        // for (const file of event.target.files) {
        //     for (const f of this.files) {
        //         if (f.name === file.name) {
        //             contain = true;
        //         }
        //     }
        //     if (!contain) {
        //         this.files.fill(file);
        //     }
        //     contain = false;
        // }
        //

        for (const file of this.files) {
            if (file.name.endsWith('.vhdr')) {
                this.vhdrName = file.name;
                this.vhdrOk = true;
            } else if (file.name.endsWith('.vmrk')) {
                this.vmrkName = file.name;
                this.vmrkOk = true;
            } else if (file.name.endsWith('.eeg')) {
                this.eegName = file.name;
                this.eegOk = true;
            }
        }
        this.isSelectionValid = this.vhdrOk && this.eegOk && this.vmrkOk;
    }

    private unSetFiles() {
        this.vmrkOk = false;
        this.eegOk = false;
        this.vhdrOk = false;
        this.eegName = '';
        this.vhdrName = '';
        this.vmrkName = '';
    }

    uploadEEG() {

        this.isUploadSuccess = false;
        this.isUploading = false;
        this.isSelectionValid = false;
        this.fileService.uploadEEG(this.files)
            .subscribe(event => {
                if (event.type === HttpEventType.UploadProgress) {
                    this.uploadingPercentage = Math.round((event.loaded / event.total) * 100);
                    this.isUploading = true;
                } else if (event.type === HttpEventType.Response) {
                    this.isUploading = false;
                    if (this.fileService.isUploaded) {
                        this.postUploadEEG(<Eeg>event.body);
                    }
                }
            });
        // .subscribe(response => {
        //     if (this.fileService.isUploaded) {
        //         this.postUploadEEG(<Eeg>response);
        //     }
        // }, error => {
        //     console.log(error);
        // });
    }

    postUploadEEG(eeg: Eeg) {

        this.eeg = eeg;
        this.eegSignalLocation = eeg.signalLocation;
        this.isUploadSuccess = true;
        this.isClassifyButtonShow = true;
        this.isSelectionValid = true;
        this.fileService.isUploaded = false;
    }

    doClassify() {

        this.isClassifyButtonShow = false;
        if (this.eeg !== null) {
            this.classificationService.classify(this.eeg.dataLocation)
                .subscribe(event => {
                    if (event.type === HttpEventType.UploadProgress) {
                        this.isResultLoading = true;
                        localStorage.setItem('classifying', 'true');
                    } else if (event.type === HttpEventType.Response) {
                        this.isResultLoading = false;
                        localStorage.setItem('classifying', 'false');
                        if (this.classificationService.isClassified) {
                            this.newResult = <Result>(event.body);
                            this.isClassifyButtonShow = true;
                            this.requestResultNavigation(this.newResult);
                        }
                    }
                });
            // if (this.classificationService.isClassificationError) {
            //     this.isResultLoading = false;
            //     localStorage.setItem('classifying', 'false');
            // }
        }
        // .subscribe(res => {
        //     this.newResult = <Result>res;
        //     this.requestResultNavigatin(this.newResult);
        // }, (err) => {
        //     console.log(err);
        // });
    }

    requestResultNavigation(result: Result) {

        this.classificationService.isClassified = false;
        this.router.navigate(['result', {'fromClassification': 'true'}], this.getParsingObjects());
    }

    getParsingObjects(): NavigationExtras {
        return {
            queryParams: {
                'eeg': JSON.stringify(this.eeg),
                'result': JSON.stringify(this.newResult)
            }
        };
    }
}
