import {Component, OnDestroy} from '@angular/core';
import {Title} from '@angular/platform-browser';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
    constructor(private titleService: Title) {
        this.titleService.setTitle('ASDGenus');
        localStorage.setItem('uid', '0');
        localStorage.setItem('classifying', 'false');
    }

    ngOnDestroy(): void {
        localStorage.setItem('uid', '0');
        localStorage.setItem('classifying', 'false');
    }
}
