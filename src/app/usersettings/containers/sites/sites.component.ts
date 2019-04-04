import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { SitesService, Site, EntityState } from 'pip-clients-shell';
import { PipNavService } from 'pip-webui2-nav';
import { Observable, of, Subscription } from 'rxjs';
import { filter, switchMap, map, distinct } from 'rxjs/operators';

import { sitesTranslations } from './sites.strings';
import { ConnectToSiteDialogComponent } from '../../components/connect-to-site-dialog/connect-to-site-dialog.component';
import { CreateSiteDialogComponent } from '../../components/create-site-dialog/create-site-dialog.component';

@Component({
    selector: 'pip-sites',
    templateUrl: './sites.component.html',
    styleUrls: ['./sites.component.scss']
})
export class SitesComponent implements OnInit, OnDestroy {

    private loaded = false;
    private subs: Subscription;

    @ViewChild('confirmDisconnectDialog') confirmDisconnectDialog: TemplateRef<any>;

    public sites$: Observable<Site[]>;
    public state$: Observable<EntityState>;
    public loading$: Observable<boolean>;

    constructor(
        private dialog: MatDialog,
        private navService: PipNavService,
        private sitesService: SitesService,
        private snackBar: MatSnackBar,
        private translate: TranslateService,
    ) {
        this.subs = new Subscription();
        this.navService.showTitle('USERSETTINGS_CONTAINER_SITES');

        this.translate.setTranslation('en', sitesTranslations.en, true);
        this.translate.setTranslation('ru', sitesTranslations.ru, true);
        this.sites$ = this.sitesService.sites$;
        this.state$ = this.sitesService.state$.pipe(
            switchMap(state => {
                if (state === EntityState.Data) { this.loaded = true; }
                if (this.loaded) {
                    return of(EntityState.Data);
                } else { return of(state); }
            })
        );
        this.loading$ = this.sitesService.state$.pipe(
            map(state => this.loaded ? state === EntityState.Progress : false)
        );
        this.subs.add(this.sitesService.error$.pipe(
            filter(error => error !== null),
            distinct()
        ).subscribe(error => {
            this.snackBar.open(
                error.message || error,
                undefined,
                { horizontalPosition: 'left', verticalPosition: 'bottom', duration: 2000, panelClass: 'pip-error-snackbar' }
            );
        }));
    }

    ngOnInit() { }

    ngOnDestroy() { this.subs.unsubscribe(); }

    public onSiteDisconnectAsk(site: Site) {
        this.dialog.open(this.confirmDisconnectDialog, {
            maxWidth: '320px',
            data: site
        }).afterClosed().subscribe((res: boolean) => {
            if (res) {
                this.onSiteDisconnect(site);
            }
        });
    }

    public onSiteDisconnect(site: Site) {
        this.sitesService.disconnectFromSite(site);
    }

    public onSiteCreate() {
        // TODO: Who knows
        this.dialog.open(CreateSiteDialogComponent, {
            maxWidth: '320px'
        }).afterClosed().subscribe((res: Site) => {
            if (res) {
                this.sitesService.createSite(res);
            }
        });
    }

    public onSiteConnect() {
        this.dialog.open(ConnectToSiteDialogComponent, {
            maxWidth: '320px',
            data: {
                loading$: this.loading$
            }
        }).afterClosed().subscribe((res: Site) => {
            if (res) {
                this.sitesService.connectToSite(res);
            }
        });
    }

}
