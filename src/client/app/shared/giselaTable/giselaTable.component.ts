import {Component} from '@angular/core';
import {DataService} from '../api/data.service';
import {GiselaDataModel} from '../api/datamodels.model';
import {now} from "moment";
import moment = require("moment");

/**
 * This class represents the lazy loaded GiselaTableComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'gisela-table',
    templateUrl: 'giselaTable.component.html',
    styleUrls: ['giselaTable.component.css'],
    providers: [DataService]
})
export class GiselaTableComponent {

    // inject DataService
    constructor(private dataService: DataService) {
        // listen for changes of positions delivered by DataService
        dataService.positionsChanged.subscribe((positions: GiselaDataModel[]) => {
            this.coordinates = positions;
        });
        // listen for changes of traveled Distance delivered by DataService
        dataService.totalDistanceChanged.subscribe((totalDistance: string) => {
            this.totalDistanceTraveled = totalDistance;

        })
    }

    public isAfterNow = function (date:any) {
        if (moment(date).isAfter(moment.now())) {
            return 'italic';
        } else {
            return ''
        }
    };

    /**
     * array with all the locations where gisela has been
     * @type {Array}
     */
    private coordinates: GiselaDataModel[] = [];
    private totalDistanceTraveled: string;

}

