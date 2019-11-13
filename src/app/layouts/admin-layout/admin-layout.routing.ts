import {Routes} from '@angular/router';

import {HomeComponent} from '../../home/home.component';
import {UserProfileComponent} from '../../user-profile/user-profile.component';
import {ResultComponent} from '../../results/result.component';
import {PatientComponent} from '../../patient/patient.component';
import {IconsComponent} from '../../icons/icons.component';
import {MapsComponent} from '../../maps/maps.component';
import {ThermalComponent} from '../../thermal/thermal.component';
import {UpgradeComponent} from '../../upgrade/upgrade.component';

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
    //     component: IconsComponent
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
    {path: 'home', component: HomeComponent},
    {path: 'user-profile', component: UserProfileComponent},
    {path: 'result', component: ResultComponent},
    {path: 'patient', component: PatientComponent},
    {path: 'icons', component: IconsComponent},
    {path: 'maps', component: MapsComponent},
    {path: 'thermal', component: ThermalComponent},
    {path: 'upgrade', component: UpgradeComponent},
];
