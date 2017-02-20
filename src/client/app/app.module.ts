import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {APP_BASE_HREF} from '@angular/common';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {globalSecrets} from './../assets/secrets/option.prod';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import {HomeModule} from './home/home.module';
import {SharedModule} from './shared/shared.module';

import {AgmCoreModule, MapsAPILoader} from 'angular2-google-maps/core';


@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule,
        HomeModule,
        SharedModule.forRoot(),
        AgmCoreModule.forRoot({apiKey: globalSecrets.googleMapsApiKey}),
        NgbModule.forRoot()
    ],
    declarations: [AppComponent],
    providers: [{
        provide: APP_BASE_HREF,
        useValue: '<%= APP_BASE %>'
    }],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule {
}
