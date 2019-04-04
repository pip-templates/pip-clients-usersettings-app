import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment_ from 'moment';
import { SessionDataService, Session, EntityState, SessionService } from 'pip-clients-shell';
import { PipNavService } from 'pip-webui2-nav';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

import { sessionsTranslations } from './sessions.strings';
import { MatDialog } from '@angular/material';

const moment = moment_;

@Component({
    selector: 'pip-sessions',
    templateUrl: './sessions.component.html',
    styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit {

    @ViewChild('confirmCloseAllDialog') confirmCloseAllDialog: TemplateRef<any>;

    public loading$: Observable<boolean>;
    public state$: BehaviorSubject<EntityState>;
    public sessions: Session[];

    constructor(
        private dialog: MatDialog,
        private navService: PipNavService,
        private translate: TranslateService,
        private sessionData: SessionDataService,
        private session: SessionService
    ) {
        this.state$ = new BehaviorSubject<EntityState>(EntityState.Progress);
        this.loading$ = this.session.state$.pipe(
            withLatestFrom(this.state$),
            map(([sessionState, state]: [EntityState, EntityState]) => {
                if (state === EntityState.Data) {
                    return sessionState === EntityState.Progress;
                } else {
                    return false;
                }
            })
        );
        this.navService.showTitle('USERSETTINGS_CONTAINER_SESSIONS');

        this.translate.setTranslation('en', sessionsTranslations.en, true);
        this.translate.setTranslation('ru', sessionsTranslations.ru, true);
        this.sessionData.readHistory().subscribe(data => {
            this.sessions = data;
            this.state$.next(EntityState.Data);
        });
    }

    ngOnInit() { }

    public formatSessionTitle(session: Session): string {
        let ret = '';
        if (session.address) { ret += 'IP: ' + session.address; }
        if (session.client) { ret += ' on ' + session.client; }
        return ret;
    }

    public formatSessionSubtitle(session: Session): string {
        let ret = '';
        ret += this.translate.instant('SESSION_SIGNIN') + ': ' + moment(session.open_time).format('LLL');
        if (session.close_time) {
            ret += '; ' + this.translate.instant('SESSION_SIGNOUT') + ': ' + moment(session.close_time).format('LLL');
        }
        return ret;
    }

    public onCloseAll() {
        this.dialog.open(this.confirmCloseAllDialog, {
            maxWidth: '320px'
        }).afterClosed().subscribe(res => {
            if (res) {
                this.session.closeAll();
            }
        });
    }

}
