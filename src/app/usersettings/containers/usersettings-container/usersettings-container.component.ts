import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import findIndex from 'lodash/findIndex';
import { TranslateService } from '@ngx-translate/core';
import { PipMediaService, PipSidenavService, MediaMainChange } from 'pip-webui2-layouts';
import { PipNavService } from 'pip-webui2-nav';
import { BehaviorSubject, Subscription } from 'rxjs';

import { usersettingsContainerTranslations } from './usersettings-container.strings';

@Component({
    selector: 'pip-usersettings-container',
    templateUrl: './usersettings-container.component.html',
    styleUrls: ['./usersettings-container.component.scss']
})
export class UsersettingsContainerComponent implements OnInit, OnDestroy {

    private isBackIcon = false;
    private subs: Subscription;

    public currentRoutes: Routes;
    public index: number;
    public isSingle$: BehaviorSubject<boolean>;

    constructor(
        private activatedRoute: ActivatedRoute,
        private cd: ChangeDetectorRef,
        private media: PipMediaService,
        private navService: PipNavService,
        private router: Router,
        private sidenavService: PipSidenavService,
        private translate: TranslateService
    ) {
        this.subs = new Subscription();

        this.translate.setTranslation('en', usersettingsContainerTranslations.en, true);
        this.translate.setTranslation('ru', usersettingsContainerTranslations.ru, true);

        this.isSingle$ = new BehaviorSubject<boolean>(!this.media.isMainActive('lt-md')
            ? !!this.activatedRoute.snapshot.queryParams['single']
            : false);

        this.currentRoutes = this.activatedRoute.routeConfig.children.filter(r => r.path);
        let route = this.router.url.replace('/', '');
        const paramsIdx = route.indexOf('?');
        if (paramsIdx >= 0) { route = route.substring(0, paramsIdx); }
        const index = findIndex(this.currentRoutes, ['path', route]);
        this.index = index < 0 ? 0 : index;
    }

    ngOnInit() {
        this.subs.add(this.media.asObservableMain().subscribe((change: MediaMainChange) => {
            if (!(change.aliases.includes('xs') || change.aliases.includes('sm'))) {
                this.isSingle$.next(false);
                if (this.isBackIcon) { this.showMenuIcon(); }
            }

            if ((change.aliases.includes('xs') || change.aliases.includes('sm'))) {
                this.isSingle$.next(true);
                if (!this.isBackIcon) { this.showBackIcon(); }
            }

            this.router.navigate([], { queryParams: { single: this.isSingle$.getValue() }, queryParamsHandling: 'merge' });
            this.cd.detectChanges();
        }));
    }

    ngOnDestroy() { this.subs.unsubscribe(); }

    private showBackIcon() {
        this.isBackIcon = true;
        this.navService.showNavIcon({
            icon: 'arrow_back',
            action: () => { this.isSingle$.next(false); this.showMenuIcon(); }
        });
    }

    private showMenuIcon() {
        this.isBackIcon = false;
        this.navService.showNavIcon({
            icon: 'menu',
            action: () => {
                this.sidenavService.toggleOpened();
            }
        });
    }

    public onSelect(payload: { id: string, index: number }) {
        this.index = payload.index < 0 ? 0 : payload.index;
        if (this.media.isMainActive('xs') || this.media.isMainActive('sm')) {
            this.isSingle$.next(true);
            this.showBackIcon();
        }
    }
}
