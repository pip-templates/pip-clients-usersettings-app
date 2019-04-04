import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UsersDataService, User } from 'pip-clients-shell';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { AccountSettingsUpdateInitAction } from '../store/index';

@Injectable()
export class AccountService {

    private loadingCount$: BehaviorSubject<number>;

    constructor(
        private store: Store<any>,
        private usersDataService: UsersDataService,
    ) {
        this.loadingCount$ = new BehaviorSubject(0);
    }

    private loadingCountModify(inc: number) {
        this.loadingCount$.next(this.loadingCount$.getValue() + inc);
    }

    public updateUser(data: User): Observable<User> {
        this.loadingCountModify(1);
        return this.usersDataService.updateUser(data).pipe(
            tap(() => { this.loadingCountModify(-1); })
        );
    }

    public updateSettings(settings: any) {
        this.loadingCountModify(1);
        this.store.dispatch(new AccountSettingsUpdateInitAction(this.loadingCount$, settings));
    }

    public get loading$(): Observable<boolean> {
        return this.loadingCount$.asObservable().pipe(map(c => c !== 0));
    }

}
