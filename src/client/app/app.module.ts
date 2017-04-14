import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {APP_BASE_HREF} from '@angular/common';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DataTableModule} from "angular2-datatable/index";


import {HomeModule} from './home/home.module';
import {SharedModule} from './shared/shared.module';

import {AgmCoreModule, MapsAPILoader} from 'angular2-google-maps/core';


@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule,
        HomeModule,
        DataTableModule,
        SharedModule.forRoot(),
        AgmCoreModule.forRoot({apiKey: 'AIzaSyBUTf6gA-CM_EY1wqPjt14SQ9YwiLiDHNM'}),
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
