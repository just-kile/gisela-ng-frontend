import {Component} from '@angular/core';
import {DataService} from '../api/data.service';
import {GiselaDataModel} from "../api/datamodels.model";
import moment = require('moment');

/**
 * This class represents the lazy loaded GMapsComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'gmaps',
    templateUrl: 'gmaps.component.html',
    styleUrls: ['gmaps.component.css'],
    providers: [DataService]
})
export class GMapsComponent {

    constructor(private dataService: DataService) {
        // listen for changes of positions delivered by DataService
        dataService.positionsChanged.subscribe((positions: GiselaDataModel[]) => {
            this.coordinates = positions;
        })
    }


    /**
     * array with all the locations where gisela has been
     * @type {Array}
     */
    private coordinates: GiselaDataModel[] = [];


    /**
     * Default gmaps settings
     * latitude and longitude are centered to UK
     * gisela-ico is loaded to an external image-server (TODO: load form local source)
     * @type {{zoom: number; latitude: number; longitude: number; icon: string}}
     */
    private gmapsSettings = {
        "zoom": 1,
        // TODO: implement autoFitToBounds when it has been released,
        // TODO: see https://github.com/SebastianM/angular2-google-maps/pull/868 for further information
        // "latitude": 51.678418,
        // "longitude": 7.809007,
        "icon": '/assets/icons/gisela_ico.png'
    };

    private dateComparedToNow = function (entry:GiselaDataModel) {
        let result = '';
        if (moment(entry.start).isBefore(moment.now()) && moment(entry.end).isAfter(moment.now())) {
            result = 'active';
        } else if (moment(entry.start).isBefore(moment.now()) && moment(entry.end).isBefore(moment.now())) {
            result = 'past';
        } else {
            result = 'future';
        }

        return result;
    }

}

