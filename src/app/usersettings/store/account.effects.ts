import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { SettingsService, SettingsActionType, SettingsUpdateSuccessAction, SettingsUpdateFailureAction } from 'pip-clients-shell';
import { Observable, of } from 'rxjs';
import { map, switchMap, exhaustMap, take } from 'rxjs/operators';

import * as fromAccountActions from './account.actions';

@Injectable()
export class AccountEffects {
    constructor(
        private actions$: Actions,
        private settingsService: SettingsService
    ) { }

    @Effect() accountSettingsUpdateInit$: Observable<Action> = this.actions$.pipe(
        ofType(fromAccountActions.AccountActionType.AccountSettingsUpdateInit),
        switchMap((action: fromAccountActions.AccountSettingsUpdateInitAction) => {
            this.settingsService.updateSettings(action.settings, true);
            return of(new fromAccountActions.AccountSettingsUpdateStartedAction(action.loadingCount$));
        })
    );

    @Effect({ dispatch: false }) accountSettingsUpdateStarted$: Observable<void> = this.actions$.pipe(
        ofType(fromAccountActions.AccountActionType.AccountSettingsUpdateStarted),
        exhaustMap((updateStartedAction: fromAccountActions.AccountSettingsUpdateStartedAction) => {
            return this.actions$.pipe(
                ofType(SettingsActionType.SettingsUpdateSuccess, SettingsActionType.SettingsUpdateFailure),
                take(1),
                map((action: SettingsUpdateSuccessAction | SettingsUpdateFailureAction) => {
                    updateStartedAction.loadingCount$.next(updateStartedAction.loadingCount$.getValue() - 1);
                    // if (action.type === SettingsActionType.SettingsUpdateSuccess) {

                    // } else {

                    // }
                })
            );
        })
    );
}
