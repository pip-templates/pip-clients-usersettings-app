import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PipSelectedModule } from 'pip-webui2-behaviors';
import { PipMenuLayoutModule } from 'pip-webui2-layouts';

import { UsersettingsContainerComponent } from './usersettings-container.component';

@NgModule({
    declarations: [UsersettingsContainerComponent],
    exports: [UsersettingsContainerComponent],
    imports: [
        // Angular and vendors
        CommonModule,
        FlexLayoutModule,
        MatListModule,
        RouterModule,
        TranslateModule,
        // pip-suite2 & pip-webui2
        PipMenuLayoutModule,
        PipSelectedModule
    ]
})
export class UsersettingsContainerModule { }
