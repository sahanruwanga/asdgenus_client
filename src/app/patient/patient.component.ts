import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Patient} from '../models/patient';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PatientService} from '../services/patient.service';

@Component({
    selector: 'app-patient',
    templateUrl: './patient.component.html',
    styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

    showViewPatient = false;
    showSearch = true;
    showAddPatient = false;
    patients: Array<Patient>;
    currentPatient: Patient;
    updateTempPatient: Patient;
    newPatient: Patient;
    private patientDetailsForm: FormGroup;

    /**
     * Constructor
     *
     * @param router
     * @param formBuilder
     * @param patientService
     */
    constructor(private router: Router,
                private formBuilder: FormBuilder,
                private patientService: PatientService) {
        if (localStorage.getItem('uid') === '0') {
            this.router.navigate(['login']);
        }
        this.newPatient = new Patient(null, null, '', '');
        this.patients = new Array<Patient>();
        this.getAllPatients();  // Load all saved patients from db
    }

    /**
     *
     */
    ngOnInit() {

        this.loadPatientDetailsForm();
    }

    /**
     * Define patient details form to have validations
     *
     */
    loadPatientDetailsForm() {

        this.patientDetailsForm = this.formBuilder.group({
            'name': [null, Validators.required],
            'age': [null, Validators.required],
            'gender': [null, Validators.required]
        });
    }

    /**
     * On click action of the close button in patient update/view section
     *
     */
    onCloseUpdatePatient() {
        this.showViewPatient = false;
        this.showSearch = true;
    }

    /**
     * On click of the edit icon for each patient, show edit section
     *
     * @param patient
     */
    onEditClick(patient: Patient) {
        this.currentPatient = patient;
        this.updateTempPatient = new Patient(patient.id, patient.age, patient.name, patient.gender);
        // this.updateTempPatient = patient;
        this.showViewPatient = true;
        this.showAddPatient = false;
        this.showSearch = false;
    }

    /**
     * On click of the result icon for each patient
     *
     * @param patient
     */
    onResultClick(patient: Patient) {
        this.showViewPatient = false;
        this.showAddPatient = false;
        this.showSearch = true;
    }

    /**
     * Close icon click on the new patient section
     *
     */
    onCloseAddNew() {
        this.showAddPatient = false;
        this.showSearch = true;
    }

    /**
     * Click on the add new button after the search bar
     *
     */
    onAddNewPatient() {
        this.showAddPatient = true;
        this.showSearch = false;
    }

    /**
     * Get all patients from db using PatientService
     *
     */
    getAllPatients() {

        this.patientService.getAllPatients()
            .subscribe(response => {
                this.patients = <Patient[]>response;
                if (this.patients === null) {
                    this.patients = new Array<Patient>();
                }
            }, error => {
                console.log(error);
            });
    }

    /**
     * Click on the save button of the new patient adding section
     *
     */
    onSaveNewPatient() {

        // Call to save in db
        this.patientService.addPatient(this.newPatient)
            .subscribe(response => {
                if (this.patientService.isAdded) {
                    this.postSavePatient(response);
                }
            }, error => {
                console.log(error);
            });
    }

    /**
     * Do required things after a successful addition of a new patient
     *
     * @param id
     */
    postSavePatient(id: number) {

        this.newPatient.id = id;
        this.patients.push(this.newPatient);
        this.showAddPatient = false;
        this.showSearch = true;
        this.newPatient = new Patient(null, null, null, null);
        this.loadPatientDetailsForm();  // To ignore red colors on fields after on addition
        this.patientService.isAdded = false;
        // this.newPatient = null;
    }

    /**
     * Update button click for updating patient details
     *
     */
    onUpdatePatient() {

        this.patientService.updatePatient(this.updateTempPatient)   // Call to update patient
            .subscribe(response => {
                if (this.patientService.isUpdated) {
                    this.postUpdatePatient();
                }
            }, error => {
                console.log(error);
            })
    }

    /**
     * Do required things after successful update done for a patient
     *
     */
    postUpdatePatient() {

        this.patients.map((patient, i) => {
            if (patient.id === this.updateTempPatient.id) {
                this.patients[i] = this.updateTempPatient;
            }
        });
        this.showViewPatient = false;
        this.showSearch = true;
        this.patientService.isUpdated = false;
    }

    /**
     * On click of the delete icon for each patient
     *
     * @param patient
     */
    onDeleteClick(patient: Patient) {

        this.patientService.deletePatient(patient.id)   // Call to delete patient
            .subscribe(response => {
                if (this.patientService.isDeleted) {
                    this.postDeletePatient(patient);
                }
            }, error => {
                console.log(error);
            });
    }

    /**
     * Do required things after a successful deletion of a patient
     *
     * @param patient
     */
    postDeletePatient(patient: Patient) {

        this.patients.map((p, i) => {
            if (p.id === patient.id) {
                this.patients.splice(i, 1);
            }
        });
        this.showViewPatient = false;
        this.showAddPatient = false;
        this.showSearch = true;
        this.patientService.isDeleted = false;
    }

    /**
     * Click on the search button
     *
     */
    doSearch() {
        // this.patientService.getPatient()
        //     .subscribe(response => {
        //         console.log(response);
        //     }, error => {
        //         console.log(error);
        //     });
    }
}
