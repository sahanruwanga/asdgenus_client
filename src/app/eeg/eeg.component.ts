import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Eeg} from '../models/eeg';
import {EegService} from '../services/eeg.service';

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

    constructor(private router: Router, private eegService: EegService) {
        if (localStorage.getItem('uid') === '0') {
            this.router.navigate(['login']);
        }

        this.showingEEG = new Eeg(null, null, null, null, null, null, null, null);
        this.eegs = new Array<Eeg>();
        this.getAllEEG();
    }

    ngOnInit() {
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

        this.eegService.deleteEEG(eeg.id)
            .subscribe(response => {
                if (this.eegService.isDeleted) {
                    this.postDeleteEEG(eeg);
                }
            }, error => {
                console.log(error);
            });
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
