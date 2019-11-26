import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Eeg} from '../models/eeg';
import {EegService} from '../services/eeg.service';
import {ConfirmationDialogService} from '../services/confirmation.dialog.service';

@Component({
    selector: 'app-eeg',
    templateUrl: './eeg.component.html',
    styleUrls: ['./eeg.component.css']
})
export class EegComponent implements OnInit {
    isShowSearch = true;
    isShowEEG = false;
    showingEEG: Eeg;
    eegs: Array<Eeg>;
    searchText;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private eegService: EegService,
                private confirmationDialogService: ConfirmationDialogService) {
        if (localStorage.getItem('uid') === '0') {
            this.router.navigate(['login']);
        }

        this.showingEEG = new Eeg(null, null, null, null, null, null, null, null, null);
        this.eegs = new Array<Eeg>();
        this.getAllEEG();
    }

    ngOnInit() {
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

    closeEEG() {
        this.isShowEEG = false;
        this.isShowSearch = true;
    }

    onViewEEG(eeg: Eeg) {
        this.showingEEG = eeg;
        this.isShowSearch = false;
        this.isShowEEG = true;
    }

    getAllEEG() {

        this.eegService.getAllEEGs()
            .subscribe(response => {
                if (this.eegService.isGetAllEEGs) {
                    this.postGetAllEEG(<Eeg[]>response);
                }
            }, error => {
                console.log(error);
            });
    }

    postGetAllEEG(eegs: Eeg[]) {
        this.eegs = eegs;
        if (this.eegs === null) {
            this.eegs = new Array<Eeg>();
        }
        this.eegService.isGetAllEEGs = false;
    }

    onDeleteEEG(eeg: Eeg) {

        this.confirmationDialogService.confirm('Delete EEG',
            'Deletion will erase the result EEG too, ' +
            'Do you want to delete anyway?')
            .then(confirm => {
                if (confirm) {
                    this.eegService.deleteEEG(eeg.id)
                        .subscribe(response => {
                            if (this.eegService.isDeleted) {
                                this.postDeleteEEG(eeg);
                            }
                        }, error => {
                            console.log(error);
                        });
                }
            })
            .catch(() => '');
    }

    postDeleteEEG(eeg: Eeg) {
        this.eegs.map((e, i) => {
            if (e.id === eeg.id) {
                this.eegs.splice(i, 1);
            }
        });
        this.isShowSearch = true;
        this.isShowEEG = false;
    }
}
