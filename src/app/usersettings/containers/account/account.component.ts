import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSelectChange, MatDialog } from '@angular/material';
import merge from 'lodash/merge';
import {
    EntityState,
    SessionService,
    SettingsService,
    SidenavMenuMode,
    SitesService,
    // Site,
    UsersDataService,
    User,
} from 'pip-clients-shell';
import { PipNavService } from 'pip-webui2-nav';
import { PipThemesService } from 'pip-webui2-themes';
import { BehaviorSubject, Subscription, /* combineLatest,*/ Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { accountTranslations } from './account.strings';
import { ChangePasswordDialogComponent } from '../../components/change-password-dialog/change-password-dialog.component';
import { AccountService } from '../../services/account.service';

@Component({
    selector: 'pip-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {

    private subs: Subscription;
    // private currentSite: Site;
    private formDefaultValue: Object;
    private settingsDefaultValue: Object;

    public form: FormGroup;
    public settings: FormGroup;
    public languages: any[];
    public menuModes = Object.values(SidenavMenuMode);
    public themes: { key: string, name: string }[];
    public viewState$: BehaviorSubject<EntityState>;
    public loading$: Observable<boolean>;
    public user: User;

    constructor(
        private accountService: AccountService,
        private fb: FormBuilder,
        private dialog: MatDialog,
        private navService: PipNavService,
        private sessionService: SessionService,
        private settingsService: SettingsService,
        // private sitesService: SitesService,
        private themesService: PipThemesService,
        private translate: TranslateService,
        private usersData: UsersDataService
    ) {
        this.navService.showTitle('USERSETTINGS_CONTAINER_ACCOUNT');
        this.subs = new Subscription();

        this.translate.setTranslation('en', accountTranslations.en, true);
        this.translate.setTranslation('ru', accountTranslations.ru, true);
        this.languages = this.translate.getLangs();
        this.themes = this.themesService.themes.map(theme => {
            return {
                key: theme.name,
                name: 'ACCOUNT_THEME_' + theme.name.replace(new RegExp('-', 'g'), '').toUpperCase()
            };
        });

        this.viewState$ = new BehaviorSubject<EntityState>(EntityState.Progress);
        this.loading$ = this.accountService.loading$;
        this.form = this.fb.group({
            avatar: [null],
            name: ['', Validators.required],
            position: [''],
            company: [''],
            email: ['', [Validators.required, Validators.email]],
            phone: [''],
            language: [''],
            theme: ['']
        });
        this.settings = this.fb.group({
            menu_mode: ['']
        });
        this.subs.add(this.sessionService.session$.pipe(
            filter(s => !!s),
            switchMap(session => this.usersData.readUser(session.user_id))
        ).subscribe(user => {
            this.user = user;
            this.formDefaultValue = {
                avatar: this.user.avatar || null,
                name: this.user.name,
                position: this.user.position || '',
                company: this.user.company || '',
                email: this.user.email,
                phone: this.user.phone || '',
                language: this.user.language,
                theme: this.user.theme
            };
            this.form.setValue(this.formDefaultValue);
            // this.subs.add(combineLatest(
            //     this.settingsService.settings$,
            //     this.sitesService.current$
            // ).pipe(
            //     filter(([settings, site]) => !!settings && !!site)
            // ).subscribe(([settings, site]) => {
            //     this.viewState$.next(user ? EntityState.Data : EntityState.Empty);
            //     this.currentSite = site;
            //     this.settingsDefaultValue = {
            //         menu_mode: settings['menu_mode_' + site.id] || 'default'
            //     };
            //     this.settings.setValue(this.settingsDefaultValue);
            // }));
            this.subs.add(
                this.settingsService.settings$.pipe(
                    filter((settings) => settings !== null)
                ).subscribe(settings => {
                    this.viewState$.next(user ? EntityState.Data : EntityState.Empty);
                    this.settingsDefaultValue = {
                        menu_mode: settings['menu_mode'] || 'default'
                    };
                    this.settings.setValue(this.settingsDefaultValue);
                }));
        }, () => { this.viewState$.next(EntityState.Empty); }
        ));
        this.subs.add(this.loading$.subscribe(val => {
            if (val) {
                this.form.disable();
                this.settings.disable();
            } else {
                this.form.enable();
                this.settings.enable();
                this.form.markAsUntouched();
                this.settings.markAsUntouched();
            }
        }));
    }

    ngOnInit() { }

    ngOnDestroy() {
        this.resetLanguage();
        this.resetTheme();
        this.subs.unsubscribe();
    }

    private resetLanguage(resetFormComponent = false) {
        const languageComponent = this.form.get('language');
        if (languageComponent.touched) {
            if (resetFormComponent) { languageComponent.reset(this.formDefaultValue['language']); }
            this.translate.use(this.formDefaultValue['language']);
        }
    }

    private resetTheme(resetFormComponent = false) {
        const themeComponent = this.form.get('theme');
        if (themeComponent.touched) {
            if (resetFormComponent) { themeComponent.reset(this.formDefaultValue['theme']); }
            this.themesService.selectedThemeName = this.formDefaultValue['theme'];
        }
    }

    public setImage(image: any) {
        this.form.patchValue({ avatar: image && image.url || null });
    }

    public hasError(field: string, error: string) {
        return this.form.get(field).getError(error) && this.form.get(field).touched;
    }

    public openChangePasswordDialog() {
        this.dialog.open(ChangePasswordDialogComponent, {
            width: '320px',
            data: { user: this.user }
        });
    }

    public onLanguageChange(payload: MatSelectChange): void {
        const languageComponent = this.form.get('language');
        languageComponent.patchValue(payload.value);
        languageComponent.markAsTouched();
        this.translate.use(payload.value);
    }

    public onThemeChange(payload: MatSelectChange): void {
        const themeComponent = this.form.get('theme');
        themeComponent.patchValue(payload.value);
        themeComponent.markAsTouched();
        this.themesService.selectedThemeName = payload.value;
    }

    public onMenuModeChange(payload: MatSelectChange): void {
        const menuModeComponent = this.settings.get('menu_mode');
        menuModeComponent.patchValue(payload.value);
        menuModeComponent.markAsTouched();
    }

    public onSubmit() {
        if (this.form.touched) {
            const req = merge({}, this.user, this.form.getRawValue());
            this.accountService.updateUser(req).subscribe();
        }
        if (this.settings.touched) {
            // this.accountService.updateSettings({ ['menu_mode_' + this.currentSite.id]: this.settings.get('menu_mode').value });
            this.accountService.updateSettings(this.settings.getRawValue());
        }

    }

    public onCancel() {
        this.resetLanguage(true);
        this.resetTheme(true);
        this.form.reset(this.formDefaultValue);
    }

    public log(payload) { console.log(payload); }

}
