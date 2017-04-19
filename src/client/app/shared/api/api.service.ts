import {Injectable} from "@angular/core";
import {Http, Response} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {GiselaDataModel} from './datamodels.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import moment = require("moment");

/**
 * This class represents the lazy loaded ApiService.
 */
@Injectable()
export class ApiService {

    devUrl = 'https://gisela.notsecu.re/positions';

    constructor(private http: Http) {
    }


    private coords: any[];

    // Fetch all existing comments
    getPositions(): Observable<any[]> {

        // ...using get request
        return this.http.get(this.devUrl)
        // ...and calling .json() on the response to return data
            .map((res: Response) => this.formatStringToTimestamps(res.json()))
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    /**
     * As Date().json() != Date() we have to reformat the timestamps from the backend for each provided timestamp
     * @param res
     * @returns {GiselaDataModel[]}
     */
    private formatStringToTimestamps(res: any) {
        let data: GiselaDataModel[] = res;
        data.forEach((entry: GiselaDataModel) => {
            entry.start = moment(entry.start).toDate();
            // dirty hack to display all-day events ending on the last day of the trip, not the next day
            entry.end = moment(entry.end).subtract(moment(entry.end).utcOffset()+1, 'minutes').toDate();
            entry.created_at = moment(entry.created_at).toDate();
            entry.updated_at = moment(entry.updated_at).toDate();
        });
        return data;
    }
}
