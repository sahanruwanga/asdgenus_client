import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from '../models/user';
import {AuthenticationService} from '../services/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    user: User = new User(0, '', '', '');
    isError = false;

    constructor(private formBuilder: FormBuilder, private router: Router, private authenticationService: AuthenticationService) {
        this.requestHomeNavigation(Number(localStorage.getItem('uid')));
        this.isError = false;
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            'email': [null, Validators.required],
            'password': [null, Validators.required]
        });
    }

    onLoginFromSubmit() {
        this.authenticationService.login(this.user)
            .subscribe(res => {
                localStorage.setItem('uid', res);
                this.requestHomeNavigation(res);
            }, (err) => {
            });
    }

    requestHomeNavigation(uid: number) {

        if (this.authenticationService.isLoggedIn && uid !== 0) {
            this.router.navigate(['home']);
            this.isError = false;
        } else {
            this.isError = true;
        }
    }

    onFieldClick() {
        this.isError = false;
    }
}
