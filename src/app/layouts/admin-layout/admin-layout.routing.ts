import {Routes} from '@angular/router';

import {HomeComponent} from '../../home/home.component';
import {UserProfileComponent} from '../../user-profile/user-profile.component';
import {ResultComponent} from '../../results/result.component';
import {PatientComponent} from '../../patient/patient.component';
import {EegComponent} from '../../eeg/eeg.component';
import {ThermalComponent} from '../../thermal/thermal.component';
import {HelpComponent} from '../../help/help.component';
import {ContactComponent} from '../../contact/contact.component';
import {NavigationGuard} from '../../services/navigation.guard';
import {UnsavedResultGuard} from '../../services/unsaved-result.guard';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: HomeComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: EegComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: ThermalComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: PatientComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    {path: 'home', component: HomeComponent, canDeactivate: [NavigationGuard]},
    {path: 'user-profile', component: UserProfileComponent},
    {path: 'result', component: ResultComponent, canDeactivate: [UnsavedResultGuard]},
    {path: 'patient', component: PatientComponent},
    {path: 'eeg', component: EegComponent},
    {path: 'thermal', component: ThermalComponent},
    {path: 'help', component: HelpComponent},
    {path: 'contact', component: ContactComponent},
];
