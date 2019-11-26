import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../models/user';
import {AuthenticationService} from '../services/authentication.service';
import {Result} from '../models/result';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    user: User = new User(0, '', '', '');
    isError = false;

    constructor(private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router, private authenticationService: AuthenticationService) {
        let from = '';
        this.route.queryParams.subscribe(params => {
            if (params['from']) {
                from = JSON.parse(params['from']);
            }
        });
        if (from === 'logout') {
            localStorage.setItem('uid', '0');
            localStorage.setItem('classifying', 'false');
        }

        if (localStorage.getItem('uid') !== '0') {
            this.router.navigate(['home']);
        }
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
                const user = <User>res;
                this.requestHomeNavigation(user);
            }, (err) => {
            });
    }

    requestHomeNavigation(user: User) {

        if (this.authenticationService.isLoggedIn && user !== null) {
            localStorage.setItem('uid', String(user.id));
            localStorage.setItem('username', user.name);
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
