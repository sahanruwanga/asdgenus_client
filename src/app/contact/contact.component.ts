import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {EmailService} from '../services/email.service';
import {Email} from '../models/email';
import {Router} from '@angular/router';

declare var $: any;

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

    contactForm: FormGroup;
    email: Email;
    to = 'sahanruwanga.15@cse.mrt.ac.lk';
    from = '';
    message = '';
    subject = 'ASDGenus contact email - ';
    name = '';


    constructor(private formBuilder: FormBuilder,
                private emailService: EmailService,
                private router: Router) {
        if (localStorage.getItem('uid') === '0') {
            this.router.navigate(['login']);
        }
        this.loadForm();
    }

    loadForm() {
        this.contactForm = this.formBuilder.group({
            name: '',
            email: '',
            message: ''
        });
    }

    ngOnInit() {
    }

    onSubmit() {

        this.email = new Email(this.to, this.from, this.message, this.subject + this.name);
        this.emailService.sendMail(this.email)
            .subscribe(response => {
                if (this.emailService.mailSent) {
                    this.postSendMail();
                }
            }, error => {

            });
    }

    postSendMail() {
        this.name = '';
        this.from = '';
        this.message = '';
        this.showNotification('bottom', 'center');
    }

    showNotification(from, align) {
        const type = ['', 'info', 'success', 'warning', 'danger'];

        const color = Math.floor((Math.random() * 4) + 1);

        $.notify({
            icon: 'confirmation',
            message: '<span class="text-black-50"><b>Successful!</b> <br/>We received your message.</span>'

        }, {
            type: 'info',
            timer: 4000,
            placement: {
                from: from,
                align: align
            },
            template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
                '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
                '<i class="material-icons text-black-50" data-notify="icon">done</i> ' +
                '<span data-notify="title">{1}</span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<a href="{3}" target="{4}" data-notify="url"></a>' +
                '</div>'
        });
    }
}
