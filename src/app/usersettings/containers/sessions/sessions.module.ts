import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { PipActionListModule } from 'pip-webui2-buttons';
import { PipEmptyStateModule, PipRefItemModule } from 'pip-webui2-controls';
import { PipDocumentLayoutModule } from 'pip-webui2-layouts';

import { SessionsComponent } from './sessions.component';

@NgModule({
    declarations: [SessionsComponent],
    exports: [SessionsComponent],
    imports: [
        // Angular and vendors
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatListModule,
        MatProgressBarModule,
        TranslateModule,
        // pip-suite2 & pip-webui2
        PipActionListModule,
        PipDocumentLayoutModule,
        PipEmptyStateModule,
        PipRefItemModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SessionsModule { }
