import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {WindowRefService} from './window-ref.service';
import {NavbarComponent} from './navbar/index';


/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
    imports: [
        CommonModule,
        RouterModule],
    declarations: [
        NavbarComponent
    ],
    exports: [
        NavbarComponent,
        CommonModule,
        FormsModule,
        RouterModule
    ],
    providers: [WindowRefService]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: []
        };
    }
}
