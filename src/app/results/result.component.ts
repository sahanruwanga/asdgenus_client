import {Component, HostListener, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Result} from '../models/result';
import {ActivatedRoute, Router} from '@angular/router';
import {Eeg} from '../models/eeg';
import {PatientService} from '../services/patient.service';
import {ResultService} from '../services/result.service';
import {ResultSubject} from '../models/result-subject';
import {ConfirmationDialogService} from '../services/confirmation.dialog.service';
import {Observable} from 'rxjs';
import {ResultCanDeactivate} from '../services/unsaved-result.guard';


@Component({
    selector: 'app-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit, ResultCanDeactivate {

    isShowSearch = true;
    isUnsavedResult = false;
    showingResult: Result;
    patientControl;
    selectFormControl;
    newPatientDetailsControl;
    patientIds: Array<number>;
    isNewPatient = false;
    isShowResult = false;
    results: Array<Result>;
    newEeg: Eeg;
    newResult: Result;
    selectedSubjectId: number;
    isAddingSuccessful = false;
    newSubjectName: string;
    newSubjectAge: number;
    newSubjectGender: string;
    resultImage: string;
    searchText;

    constructor(private router: Router, private route: ActivatedRoute,
                private patientService: PatientService,
                private resultService: ResultService,
                private formBuilder: FormBuilder,
                private confirmationDialogService: ConfirmationDialogService) {
        if (localStorage.getItem('uid') === '0') {
            this.router.navigate(['login']);
        }
        this.showingResult = new Result(null, null, null, null, null, null);
        this.results = new Array<Result>();
        this.patientIds = new Array<number>();

        this.getAllResults();

        this.route.paramMap.subscribe(params => {
            if (Boolean(params.get('fromClassification'))) {
                this.isShowResult = true;
                this.isUnsavedResult = true;
                this.isShowSearch = false;
            }
        });

        if (this.isUnsavedResult) {
            this.route.queryParams.subscribe(params => {
                this.newEeg = JSON.parse(params['eeg']);
                this.newResult = JSON.parse(params['result']);
            });
            this.filterResultImage(this.newResult.result);
            this.getAllPatientIDs();
        }
    }

    filterResultImage(result: string) {
        if (result === 'No-ASD') {
            this.resultImage = './assets/img/results/n-asd.jpg';
        } else if (result === 'Low Risk for ASD') {
            this.resultImage = './assets/img/results/p-asd.jpg';
        } else if (result === 'Mild ASD') {
            this.resultImage = './assets/img/results/l-asd.jpg';
        } else if (result === 'Severe ASD') {
            this.resultImage = './assets/img/results/h-asd.jpg';
        } else {
            this.resultImage = '';
        }
    }

    ngOnInit() {
        this.patientControl = new FormControl('', [Validators.required]);
        this.selectFormControl = new FormControl('', Validators.required);
        this.loadPatientDetailsForm();

        let patientId = '-1';
        this.route.queryParams.subscribe(params => {
            if (params['patientId']) {
                patientId = JSON.parse(params['patientId']);
            }
        });
        if (patientId !== '-1') {
            this.searchText = String(patientId);
        }
    }

    /**
     * Define patient details form to have validations
     *
     */
    loadPatientDetailsForm() {

        this.newPatientDetailsControl = this.formBuilder.group({
            'name': [null, Validators.required],
            'age': [null, Validators.required],
            'gender': [null, Validators.required]
        });
    }

    closeResult() {
        this.isShowResult = false;
        this.isShowSearch = true;
        this.isUnsavedResult = false;
    }

    onViewResult(result: Result) {
        this.showingResult = result;
        this.filterResultImage(result.result);
        this.isShowSearch = false;
        this.isShowResult = true;
        this.isUnsavedResult = false;
    }

    /**
     * Get all patient IDs to show in the drop box
     */
    getAllPatientIDs() {
        this.patientService.getAllPatientIDs()
            .subscribe(response => {
                if (this.patientService.isGetAllPatientIDs) {
                    this.postGetAllPatientIDs(<number[]>response);
                }
            }, error => {
                console.log(error);
            });
    }

    /**
     * After successful completion of getting all patient IDs
     *
     * @param ids
     */
    postGetAllPatientIDs(ids: number[]) {

        this.patientIds = ids;
        if (this.patientIds === null) {
            this.patientIds = new Array<number>();
        }
        this.patientService.isGetAllPatientIDs = false;
    }

    /**
     * Save new result for an existing subject
     *
     */
    onSaveForExistingSubject() {

        const resultSubject = new ResultSubject(this.newResult.id, this.newResult.result, this.newResult.resultDescription,
            this.newResult.dateOfTaken, this.newEeg.id, this.newEeg.numberOfChannels, this.newEeg.channelNames,
            this.newEeg.duration, this.newEeg.recordedDate, this.newEeg.dataLocation, this.newEeg.signalLocation,
            this.selectedSubjectId, null, null, null);

        this.resultService.addForExistingSubject(resultSubject)
            .subscribe(response => {
                if (this.resultService.isAddedForSubject) {
                    this.postSaveForExistingSubject(<Result>response);
                }
            }, error => {
                console.log(error);
            });
    }

    /**
     * Do required things after saving result for an existing patient is successful
     *
     */
    postSaveForExistingSubject(result: Result) {

        this.newResult = result;
        this.results.push(this.newResult);
        this.isAddingSuccessful = true;
        this.isUnsavedResult = false;
        this.resultService.isAddedForSubject = false;
    }

    /**
     * Save new result for a new patient
     *
     */
    onSaveForNewSubject() {
        const resultSubject = new ResultSubject(this.newResult.id, this.newResult.result, this.newResult.resultDescription,
            this.newResult.dateOfTaken, this.newEeg.id, this.newEeg.numberOfChannels, this.newEeg.channelNames,
            this.newEeg.duration, this.newEeg.recordedDate, this.newEeg.dataLocation, this.newEeg.signalLocation,
            -1, this.newSubjectAge, this.newSubjectName, this.newSubjectGender);

        this.resultService.addForExistingSubject(resultSubject)
            .subscribe(response => {
                if (this.resultService.isAddedForSubject) {
                    this.postSaveForNewSubject(<Result>response);
                }
            }, error => {
                console.log(error);
            });
    }

    /**
     * After saving new results for a new patient is successful
     *
     */
    postSaveForNewSubject(result: Result) {

        this.newResult = result;
        this.results.push(this.newResult);
        this.isAddingSuccessful = true;
        this.isUnsavedResult = false;
        this.resultService.isAddedForSubject = false;
    }

    getAllResults() {
        this.resultService.getAllResults()
            .subscribe(response => {
                if (this.resultService.isGetAllResults) {
                    this.postGetAllResults(<Result[]>response);
                }
            }, error => {
                console.log(error);
            });
    }

    postGetAllResults(results: Result[]) {

        this.results = results;
        if (this.results === null) {
            this.results = new Array<Result>();
        }
        this.resultService.isGetAllResults = false;
    }

    getAllResultsForSubject(subjectId: number) {
        this.resultService.getAllResultsForSubject(subjectId)
            .subscribe(response => {
                if (this.resultService.isGetAllResultsForSubject) {
                    this.postGetAllResultsForSubject(<Result[]>response);
                }
            }, error => {
                console.log(error);
            });
    }

    postGetAllResultsForSubject(results: Result[]) {

        this.results = results;
        if (this.results === null) {
            this.results = new Array<Result>();
        }
        this.resultService.isGetAllResultsForSubject = false;
    }


    onDeleteClick(result: Result) {

        this.confirmationDialogService.confirm('Delete Result',
            'Result will no longer available, ' +
            'Do you want to delete anyway?')
            .then(confirm => {
                if (confirm) {
                    this.resultService.deleteResult(result.id)
                        .subscribe(response => {
                            if (this.resultService.isDeleted) {
                                this.postDeleteResult(result);
                            }
                        }, error => {
                            console.log(error);
                        });
                }
            })
            .catch(() => '');
    }

    postDeleteResult(result: Result) {

        this.results.map((r, i) => {
            if (r.id === result.id) {
                this.results.splice(i, 1);
            }
        });
        this.isShowResult = false;
        this.isShowSearch = true;
        this.resultService.isDeleted = false;
    }

    @HostListener('window:beforeunload')
    canDeactivate(): Observable<boolean> | boolean {
        return !this.isUnsavedResult;
    }
}
