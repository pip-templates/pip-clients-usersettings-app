import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'pip-clients-shell';

import {
    UsersettingsContainerComponent,
    AccountComponent,
    SitesComponent,
    SessionsComponent
} from './usersettings';

export const routes: Routes = [
    {
        path: '',
        component: UsersettingsContainerComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'account',
                component: AccountComponent
            },
            {
                path: 'sites',
                component: SitesComponent
            },
            {
                path: 'sessions',
                component: SessionsComponent
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'account'
            },
        ]
    },
    { path: '**', redirectTo: '404' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
