import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';


import {AppRoutingModule} from './app.routing';
import {ComponentsModule} from './components/components.module';

import {AppComponent} from './app.component';

import {HomeComponent} from './home/home.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {ResultComponent} from './results/result.component';
import {PatientComponent} from './patient/patient.component';
import {EegComponent} from './eeg/eeg.component';
import {ThermalComponent} from './thermal/thermal.component';
import {
    AgmCoreModule
} from '@agm/core';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {PdfViewerComponent} from 'ng2-pdf-viewer';
import {HelpComponent} from './help/help.component';
import {ContactComponent} from './contact/contact.component';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ConfirmationDialogService} from './services/confirmation.dialog.service';
import {NavigationGuard} from './services/navigation.guard';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule,
        // AgmCoreModule.forRoot({
        //     apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
        // }),
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        Ng2SearchPipeModule,
        MatDialogModule,
        NgbModule,
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        LoginComponent,
        RegisterComponent,
        MessageDialogComponent,

    ],
    providers: [ ConfirmationDialogService, NavigationGuard ],
    entryComponents: [ MessageDialogComponent ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
