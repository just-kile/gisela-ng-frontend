import { Component } from '@angular/core';
import { DataService } from '../api/data.service';
import { GiselaDataModel } from '../api/datamodels.model';

/**
 * This class represents the lazy loaded LandingPageComponent.
 */

@Component({
    moduleId: module.id,
    selector: 'landingpage',
    templateUrl: 'landingpage.component.html',
    styleUrls: ['landingpage.component.css'],
    providers: [DataService]
})
export class LandingPageComponent {
    // inject DataService
    constructor ( private dataService: DataService ) {
        // listen for changes of positions delivered by DataService
        dataService.currentTrip.subscribe((trip:GiselaDataModel) => {
            this.hasCurrentTrip = trip;
        });
    }

    private hasCurrentTrip: GiselaDataModel;
}

