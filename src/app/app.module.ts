import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShellModule, ShellContainerComponent } from 'pip-clients-shell';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { UsersettingsModule } from './usersettings/usersettings.module';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    // Angular and vendors
    BrowserModule,
    BrowserAnimationsModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    // pip-clients
    ShellModule.forMock(),
    // application modules
    AppRoutingModule,
    UsersettingsModule
  ],
  bootstrap: [ShellContainerComponent]
})
export class AppModule { }
