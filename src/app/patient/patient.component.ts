import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Patient} from '../models/patient';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-patient',
    templateUrl: './patient.component.html',
    styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

    patients: Array<Patient>;
    showViewPatient = false;
    showSearch = true;
    showAddPatient = false;
    currentPatient: Patient;
    updateTempPatient: Patient;
    newPatient: Patient = new Patient(null, null, '', '');
    private patientDetailsForm: FormGroup;

    constructor(private router: Router, private formBuilder: FormBuilder) {
        if (localStorage.getItem('uid') === '0') {
            this.router.navigate(['login']);
        }
        this.patients = [];
        this.patients.push(
            {id: 1, age: 25, name: 'sahan', gender: 'Male'},
            {id: 2, age: 5, name: 'hiss', gender: 'Female'},
            {id: 3, age: 2, name: 'ruwa', gender: 'Male'}
        );
    }

    ngOnInit() {
        this.patientDetailsForm = this.formBuilder.group({
            'name': [null, Validators.required],
            'age': [null, Validators.required],
            'gender': [null, Validators.required]
        });
    }

    closeView() {
        this.showViewPatient = false;
        this.showSearch = true;
    }

    onEditClick(patient: Patient) {
        this.currentPatient = patient;
        this.updateTempPatient = new Patient(patient.id, patient.age, patient.name, patient.gender);
        this.showViewPatient = true;
        this.showAddPatient = false;
        this.showSearch = false;
    }

    onDeleteClick(patient: Patient) {
        // Call to delete patient
        this.patients.map((p, i) => {
            if (p.id === patient.id) {
                this.patients.splice(i, 1);
            }
        });
        this.showViewPatient = false;
        this.showAddPatient = false;
        this.showSearch = true;
    }

    onResultClick(patient: Patient) {
        this.showViewPatient = false;
        this.showAddPatient = false;
        this.showSearch = true;
    }

    onUpdatePatient() {
        console.log(this.updateTempPatient);
        // Call to update patient
        this.patients.map((patient, i) => {
            if (patient.id === this.updateTempPatient.id) {
                this.patients[i] = this.updateTempPatient;
            }
        });
        this.showViewPatient = false;
        this.showSearch = true;
    }

    closeAddNew() {
        this.showAddPatient = false;
        this.showSearch = true;
    }

    onAddNewPatient() {
        this.showAddPatient = true;
        this.showSearch = false;

    }

    onSaveNewPatient() {
        console.log(this.newPatient);
        // Call to save in db
        this.patients.push(this.newPatient);
        this.showAddPatient = false;
        this.showSearch = true;
        this.newPatient = new Patient(null, null, null, null);
    }
}
