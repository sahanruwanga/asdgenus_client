import {Component, HostListener, OnInit} from '@angular/core';
import {FileService} from '../services/file.service';
import {ClassificationService} from '../services/classification.service';
import {Result} from '../models/result';
import {NavigationExtras, Event, NavigationStart, Router} from '@angular/router';
import {Eeg} from '../models/eeg';
import {HttpEventType} from '@angular/common/http';
import {ComponentCanDeactivate} from '../services/navigation.guard';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, ComponentCanDeactivate {

    files: Array<File>;
    isSelectionValid = false;
    isUploadSuccess = false;
    isClassifyButtonShow = false;
    vhdrOk = false;
    eegOk = false;
    vmrkOk = false;
    eegPath: string;
    eegName = '';
    vhdrName = '';
    vmrkName = '';
    eeg: Eeg;
    newResult: Result;
    eegSignalLocation: string;
    isResultLoading = false;
    isUploading = false;
    uploadingPercentage: number;
    currentUploadedFileNames = '';
    isFileNamesMatching = true;

    constructor(private fileService: FileService,
                private classificationService: ClassificationService,
                private router: Router) {
        this.files = new Array<File>();
        if (localStorage.getItem('uid') === '0') {
            this.router.navigate(['login']);
        }

        if (localStorage.getItem('classifying') === 'false') {
            this.isResultLoading = false;
        } else if (localStorage.getItem('classifying') === 'true') {
            this.isResultLoading = true;
        }

        this.router.events
            .subscribe((event: Event) => {
                if (event instanceof NavigationStart) {
                    return;
                }
            });
    }

    ngOnInit() {
    }

    onFilesAdded(event) {

        this.isFileNamesMatching = true;
        let eegFile: File = null;
        let vhdrFile: File = null;
        let vmrkFile: File = null;
        this.files.map((f) => {
            if (f.name.endsWith('.vhdr')) {
                vhdrFile = f;
            }
            if (f.name.endsWith('.vmrk')) {
                vmrkFile = f;
            }
            if (f.name.endsWith('.eeg')) {
                eegFile = f;
            }
        });

        this.files = new Array<File>();

        for (const f of event.target.files) {
            if (f.name.endsWith('.vhdr')) {
                vhdrFile = f;
            }
            if (f.name.endsWith('.vmrk')) {
                vmrkFile = f;
            }
            if (f.name.endsWith('.eeg')) {
                eegFile = f;
            }
        }

        if (eegFile !== null) {
            this.files.push(eegFile);
            this.eegName = eegFile.name;
            this.eegOk = true;
        }
        if (vhdrFile !== null) {
            this.files.push(vhdrFile);
            this.vhdrName = vhdrFile.name;
            this.vhdrOk = true;
        }
        if (vmrkFile !== null) {
            this.files.push(vmrkFile);
            this.vmrkName = vmrkFile.name;
            this.vmrkOk = true;
        }

        const eeg1Name = this.eegName.substring(4 - this.eegName.length, this.eegName.length - 4);
        const vhdr1Name = this.vhdrName.substring(5 - this.vhdrName.length, this.vhdrName.length - 5);
        const vmrk1Name = this.vmrkName.substring(5 - this.vmrkName.length, this.vmrkName.length - 5);
        if (vhdr1Name !== '' && vhdr1Name === eeg1Name && vhdr1Name === vmrk1Name) {
            this.isSelectionValid = true;
            this.eegOk = true;
            this.vhdrOk = true;
            this.vmrkOk = true;
        } else {
            this.isSelectionValid = false;
            if (this.eegOk && this.vmrkOk && this.vhdrOk) {
                this.isFileNamesMatching = false;
            }
        }
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

        this.currentUploadedFileNames = this.files[0].name + ', ' + this.files[1].name + ', ' + this.files[2].name;
        this.eeg = eeg;
        this.eegSignalLocation = eeg.signalImage;
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
        }
    }

    requestResultNavigation(result: Result) {

        this.classificationService.isClassified = false;
        this.router.navigate(['result', {'fromClassification': 'true'}], this.getParsingObjects());
    }

    getParsingObjects()
        :
        NavigationExtras {
        return {
            queryParams: {
                'eeg': JSON.stringify(this.eeg),
                'result': JSON.stringify(this.newResult)
            }
        };
    }

    @HostListener('window:beforeunload')
    canDeactivate(): Observable<boolean> | boolean {
        return !this.isUploading;
    }
}
