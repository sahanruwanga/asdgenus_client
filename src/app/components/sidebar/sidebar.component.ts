import {Component, OnInit} from '@angular/core';
import {NavigationGuard} from '../../services/navigation.guard';

declare const $: any;

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    {path: '/home', title: 'Home', icon: 'home', class: ''},
    {path: '/result', title: 'Results', icon: 'content_paste', class: ''},
    {path: '/patient', title: 'Patients', icon: 'people', class: ''},
    {path: '/eeg', title: 'EEG', icon: 'waves', class: ''},
    // {path: '/thermal', title: 'Thermal', icon: 'photo', class: ''},
    {path: '/user-profile', title: 'User Profile', icon: 'person', class: ''},
    {path: '/help', title: 'Help', icon: 'info', class: ''},
    {path: '/contact', title: 'Contact', icon: 'contact_support', class: ''},
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menuItems: any[];

    constructor() {
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };
}
