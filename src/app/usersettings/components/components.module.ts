import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const components = [];

@NgModule({
    declarations: components,
    exports: components,
    imports: [
        // Angular and vendors
        CommonModule
    ]
})
export class UsersettingsComponentsModule { }
