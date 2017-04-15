import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home-routing.module';
import {SharedModule} from '../shared/shared.module';
import {AgmCoreModule, MapsAPILoader} from 'angular2-google-maps/core';
import {GMapsComponent} from '../shared/gmaps/gmaps.component';
import {GiselaTableComponent} from '../shared/giselaTable/giselaTable.component';
import {SmoothScrollService} from "../shared/smoothscroll/smoothscroll.service";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LandingPageComponent} from './../shared/landingpage/landingpage.component'
import {ImprintComponent} from './../shared/imprint/imprint.component';
import {DataTableModule} from "angular2-datatable/index";
import {MomentModule} from 'angular2-moment/moment.module';
import {TableSorterComponent} from './../shared/datatableSorter/datatableSorter.component'



@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        SharedModule,
        AgmCoreModule,
        NgbModule,
        MomentModule,
        DataTableModule],
    declarations: [
        HomeComponent,
        GMapsComponent,
        GiselaTableComponent,
        LandingPageComponent,
        ImprintComponent,
        TableSorterComponent],
    exports: [
        HomeComponent,
        GMapsComponent,
        GiselaTableComponent,
        LandingPageComponent,
        TableSorterComponent
    ],
    providers: [
        SmoothScrollService]
})
export class HomeModule {
}
