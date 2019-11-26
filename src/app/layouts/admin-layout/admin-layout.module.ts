import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminLayoutRoutes} from './admin-layout.routing';
import {HomeComponent} from '../../home/home.component';
import {UserProfileComponent} from '../../user-profile/user-profile.component';
import {ResultComponent} from '../../results/result.component';
import {PatientComponent} from '../../patient/patient.component';
import {EegComponent} from '../../eeg/eeg.component';
import {ThermalComponent} from '../../thermal/thermal.component';

import {
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule
} from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {HelpComponent} from '../../help/help.component';
import {ContactComponent} from '../../contact/contact.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';

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
        Ng2SearchPipeModule,
        PdfViewerModule,
    ],
    declarations: [
        HomeComponent,
        UserProfileComponent,
        ResultComponent,
        PatientComponent,
        EegComponent,
        ThermalComponent,
        HelpComponent,
        ContactComponent,
    ]
})

export class AdminLayoutModule {
}
