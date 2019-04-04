import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSnackBarModule,
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { UsersDataService } from 'pip-clients-shell';
import { PipActionListModule } from 'pip-webui2-buttons';
import { PipEmptyStateModule } from 'pip-webui2-controls';
import { PipDocumentLayoutModule } from 'pip-webui2-layouts';
import { PipPictureEditModule } from 'pip-webui2-pictures';

import { AccountComponent } from './account.component';
import { ChangePasswordDialogComponent } from '../../components/change-password-dialog/change-password-dialog.component';

@NgModule({
    declarations: [AccountComponent, ChangePasswordDialogComponent],
    exports: [AccountComponent],
    entryComponents: [ChangePasswordDialogComponent],
    imports: [
        // Angular and vendors
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressBarModule,
        MatSelectModule,
        MatSnackBarModule,
        MatProgressBarModule,
        ReactiveFormsModule,
        TranslateModule,
        // pip-suite2 & pip-webui2
        PipActionListModule,
        PipDocumentLayoutModule,
        PipEmptyStateModule,
        PipPictureEditModule,
    ],
    providers: [UsersDataService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AccountModule { }
