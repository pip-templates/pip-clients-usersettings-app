import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';

import { UsersettingsComponentsModule } from './components';
import { UsersettingsContainersModule } from './containers';

import { AccountService } from './services/account.service';
import { AccountEffects } from './store/account.effects';

@NgModule({
    exports: [UsersettingsComponentsModule, UsersettingsContainersModule],
    imports: [
        CommonModule,
        EffectsModule.forFeature([AccountEffects]),
        UsersettingsComponentsModule,
        UsersettingsContainersModule
    ],
    providers: [
        AccountService
    ]
})
export class UsersettingsModule { }
