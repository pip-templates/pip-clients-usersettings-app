import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountModule } from './account/account.module';
import { SessionsModule } from './sessions/sessions.module';
import { SitesModule } from './sites/sites.module';
import { UsersettingsContainerModule } from './usersettings-container/usersettings-container.module';

const containers = [
    AccountModule,
    SessionsModule,
    SitesModule,
    UsersettingsContainerModule
];

@NgModule({
    exports: containers,
    imports: [
        CommonModule,
        ...containers
    ]
})
export class UsersettingsContainersModule { }
