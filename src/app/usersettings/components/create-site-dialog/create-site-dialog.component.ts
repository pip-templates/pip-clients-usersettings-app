import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { createSiteDialogTranslations } from './create-site-dialog.strings';

@Component({
    selector: 'pip-create-site-dialog',
    templateUrl: './create-site-dialog.component.html',
    styleUrls: ['./create-site-dialog.component.scss']
})
export class CreateSiteDialogComponent implements OnInit {

    public form: FormGroup;

    constructor(
        private dialogRef: MatDialogRef<CreateSiteDialogComponent>,
        private fb: FormBuilder,
        private translate: TranslateService,
    ) {
        this.translate.setTranslation('en', createSiteDialogTranslations.en, true);
        this.translate.setTranslation('ru', createSiteDialogTranslations.ru, true);

        this.form = this.fb.group({
            name: ['', Validators.required],
            description: [''],
            address: ['']
        });
    }

    ngOnInit() { }

    public hasError(field: string, error: string) {
        return this.form.get(field).getError(error) && this.form.get(field).touched;
    }

    public onSubmit() {
        if (this.form.invalid) { return; }
        this.dialogRef.close(this.form.getRawValue());
    }

}
