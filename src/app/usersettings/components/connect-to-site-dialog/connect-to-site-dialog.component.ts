import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Site, SitesDataService } from 'pip-clients-shell';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
// import { debounceTime } from 'rxjs/operators';

import { connectToSiteDialogTranslations } from './connect-to-site-dialog.strings';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'pip-connect-to-site-dialog',
    templateUrl: './connect-to-site-dialog.component.html',
    styleUrls: ['./connect-to-site-dialog.component.scss']
})
export class ConnectToSiteDialogComponent implements OnInit, OnDestroy {

    private subs: Subscription;

    public dialogLoading$: BehaviorSubject<boolean>;
    public searchControl: FormControl;
    public sites: Site[];
    public pickedSite: Site;

    constructor(
        private sitesData: SitesDataService,
        private translate: TranslateService,
        @Inject(MAT_DIALOG_DATA) public data: {
            loading$: Observable<boolean>
        }
    ) {
        this.dialogLoading$ = new BehaviorSubject<boolean>(false);
        this.subs = new Subscription();
        this.translate.setTranslation('en', connectToSiteDialogTranslations.en, true);
        this.translate.setTranslation('ru', connectToSiteDialogTranslations.ru, true);

        this.searchControl = new FormControl();
        // this.subs.add(this.searchControl.valueChanges.pipe(
        //     debounceTime(200)
        // ).subscribe((search: string) => {
        //     this.search = search;
        //     console.log('debounced search value: ', this.search);
        //     this.sitesData.readSites(this.search).subscribe(sd => {
        //         this.sites = sd.data;
        //     });
        // }));
    }

    ngOnInit() { }

    ngOnDestroy() { this.subs.unsubscribe(); }

    public onSearch() {
        this.dialogLoading$.next(true);
        this.sitesData.readSites(this.searchControl.value).subscribe(sd => {
            this.sites = sd.data;
            this.dialogLoading$.next(false);
        });
    }

}
