import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatRadioModule,
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { PipActionListModule } from 'pip-webui2-buttons';
import { PipEmptyStateModule, PipRefItemModule } from 'pip-webui2-controls';
import { PipDocumentLayoutModule } from 'pip-webui2-layouts';

import { SitesComponent } from './sites.component';
import { ConnectToSiteDialogComponent } from '../../components/connect-to-site-dialog/connect-to-site-dialog.component';
import { CreateSiteDialogComponent } from '../../components/create-site-dialog/create-site-dialog.component';

@NgModule({
    declarations: [SitesComponent, ConnectToSiteDialogComponent, CreateSiteDialogComponent],
    entryComponents: [ConnectToSiteDialogComponent, CreateSiteDialogComponent],
    exports: [SitesComponent],
    imports: [
        // Angular and vendors
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatProgressBarModule,
        MatRadioModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        TranslateModule,
        // pip-suite2 & pip-webui2
        PipActionListModule,
        PipDocumentLayoutModule,
        PipEmptyStateModule,
        PipRefItemModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SitesModule { }
