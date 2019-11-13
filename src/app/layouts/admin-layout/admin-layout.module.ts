import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { HomeComponent } from '../../home/home.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { ResultComponent } from '../../results/result.component';
import { PatientComponent } from '../../patient/patient.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { ThermalComponent } from '../../thermal/thermal.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule
} from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatCheckboxModule,
    ],
  declarations: [
    HomeComponent,
    UserProfileComponent,
    ResultComponent,
    PatientComponent,
    IconsComponent,
    MapsComponent,
    ThermalComponent,
    UpgradeComponent,
  ]
})

export class AdminLayoutModule {}
