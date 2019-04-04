import { Action } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';

export enum AccountActionType {
    AccountSettingsUpdateInit = '[Account] SettingsUpdateInit',
    AccountSettingsUpdateStarted = '[Account] SettingsUpdateStarted',
    // AccountSettingsUpdateSuccess = '[Account] SettingsUpdateSuccess',
    // AccountSettingsUpdateFailure = '[Account] SettingsUpdateFailure',
}

export class AccountSettingsUpdateInitAction implements Action {
    readonly type = AccountActionType.AccountSettingsUpdateInit;

    constructor(public loadingCount$: BehaviorSubject<number>, public settings: any) { }
}

export class AccountSettingsUpdateStartedAction implements Action {
    readonly type = AccountActionType.AccountSettingsUpdateStarted;

    constructor(public loadingCount$: BehaviorSubject<number>) { }
}

// export class AccountSettingsUpdateSuccessAction implements Action {
//     readonly type = AccountActionType.AccountSettingsUpdateSuccess;

//     constructor(public loadingCount$: BehaviorSubject<number>) { }
// }

// export class AccountSettingsUpdateFailureAction implements Action {
//     readonly type = AccountActionType.AccountSettingsUpdateFailure;

//     constructor(public loadingCount$: BehaviorSubject<number>) { }
// }


export type SettingsAction = AccountSettingsUpdateInitAction
    | AccountSettingsUpdateStartedAction;
    // | AccountSettingsUpdateSuccessAction
    // | AccountSettingsUpdateFailureAction;
