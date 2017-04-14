import {Component, AfterViewInit} from '@angular/core';
import {ApiService} from "../shared/api/api.service";
declare const smoothScroll: any;


/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'sd-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css'],
    providers: [ApiService]
})
export class HomeComponent implements AfterViewInit {
    ngAfterViewInit() {
        smoothScroll.init({});
    };
}
