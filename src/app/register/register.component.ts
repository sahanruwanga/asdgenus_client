import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../models/user';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    user: User = new User(0, '', '', '');
    isEmailDuplicate: false;
    isError = false;

    constructor(private formBuilder: FormBuilder, private router: Router, private authenticationService: AuthenticationService) {
        if (localStorage.getItem('uid') !== '0') {
            this.router.navigate(['home']);
        }
        this.isError = false;
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            'name': [null, Validators.required],
            'email': [null, Validators.required],
            'password': [null, Validators.required]
        });
    }

    onFormSubmit() {
        this.authenticationService.register(this.user)
            .subscribe(res => {
                this.requestLoginNavigation(res);
            }, (err) => {
                console.log(err);
            });
    }

    requestLoginNavigation(uid: number) {

        if (this.authenticationService.isRegistered && uid !== 0) {
            this.router.navigate(['login']);
            this.isError = false;
        } else {
            this.isError = true;
        }
    }

    onFieldClick() {
        this.isError = false;
    }
}
