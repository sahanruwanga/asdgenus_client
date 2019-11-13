import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Result} from '../models/result';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
    selector: 'app-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

    isShowSearch = true;
    isUnsavedResult = false;
    showingResult: Result;
    patientControl;
    selectFormControl;
    patientIds: number[];
    newPatient = true;
    isShowResult = false;
    results: Array<Result>;

    constructor(private router: Router, private route: ActivatedRoute,) {
        if (localStorage.getItem('uid') === '0') {
            this.router.navigate(['login']);
        }
        this.showingResult = new Result(null, null, null, null, null, null);
        this.results = [];
        this.results.push(
            {
                id: 0, eegId: 1, subjectId: 1, result: 'ASD', resultDescription: null,
                dateOfTaken: '2019/10/10'
            },
            {
                id: 1, eegId: 2, subjectId: 1, result: 'No-ASD', resultDescription: null,
                dateOfTaken: '2019/10/12'
            }, {
                id: 2, eegId: 3, subjectId: 2, result: 'ASD', resultDescription: null,
                dateOfTaken: '2019/09/10'
            }, {
                id: 3, eegId: 4, subjectId: 3, result: 'No-ASD', resultDescription: null,
                dateOfTaken: '2019/10/25'
            },
        );

        this.route.paramMap.subscribe(params => {
            if (Boolean(params.get('fromClassification'))) {
                this.isShowResult = true;
                this.isUnsavedResult = true;
                this.isShowSearch = false;
            }
        });
    }

    ngOnInit() {
        this.patientControl = new FormControl('', [Validators.required]);
        this.selectFormControl = new FormControl('', Validators.required);
        this.patientIds = [1, 2, 4, 5];
    }

    closeResult() {
        this.isShowResult = false;
        this.isShowSearch = true;
        this.isUnsavedResult = false;
    }

    onViewResult(result: Result) {
        this.showingResult = result;
        this.isShowSearch = false;
        this.isShowResult = true;
        this.isUnsavedResult = false;
    }

    onDeleteClick(result: Result) {

    }
}
