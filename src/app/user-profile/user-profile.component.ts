import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {UserService} from '../services/user.service';
import {User} from '../models/user';
import {ResultService} from '../services/result.service';
import {PatientService} from '../services/patient.service';
import {EegService} from '../services/eeg.service';
import {Patient} from '../models/patient';
import {Result} from '../models/result';
import {Eeg} from '../models/eeg';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

    user: User;
    noOfPatients = 0;
    noOfResults = 0;
    noOfEEGs = 0;
    name = '';
    email = '';

    constructor(private router: Router,
                private dialog: MatDialog,
                private userService: UserService,
                private resultService: ResultService,
                private patientService: PatientService,
                private eegService: EegService) {
        if (localStorage.getItem('uid') === '0') {
            this.router.navigate(['login']);
        }

        this.getCurrentUser();

        this.getNoOfPatients();
        this.getNoOResults();
        this.getNoOfEEGs();
    }

    getCurrentUser() {

        this.userService.getUser()
            .subscribe(response => {
                if (this.userService.isGetUser) {
                    this.user = <User>response;
                    this.name = this.user.name;
                    this.email = this.user.email;
                    this.userService.isGetUser = false;
                }
            });
    }

    getNoOfPatients() {

        this.patientService.getAllPatientIDs()
            .subscribe(response => {
                if (this.patientService.isGetAllPatientIDs && response !== null) {
                    this.noOfPatients = (<Array<Patient>>response).length;
                    this.patientService.isGetAllPatientIDs = false;
                }
            });
    }

    getNoOResults() {

        this.resultService.getAllResults()
            .subscribe(response => {
                if (this.resultService.isGetAllResults && response !== null) {
                    this.noOfResults = (<Array<Result>>response).length;
                    this.resultService.isGetAllResults = false;
                }
            });
    }

    getNoOfEEGs() {

        this.eegService.getAllEEGs()
            .subscribe(response => {
                if (this.eegService.isGetAllEEGs && response !== null) {
                    this.noOfEEGs = (<Array<Eeg>>response).length;
                    this.eegService.isGetAllEEGs = false;
                }
            });
    }

    ngOnInit() {
    }
}
