import {Injectable, Inject} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {ApiService} from './api.service';
import {GiselaDataModel} from './datamodels.model';
import * as moment from 'moment'

/**
 * This class represents the lazy loaded DataService.
 */
@Injectable()
export class DataService {

    // the event-Emitter the frontend should listen to for changes from the backend
    public positionsChanged = new BehaviorSubject<GiselaDataModel[]>([]);
    public totalDistanceChanged = new BehaviorSubject<string>('');
    public currentTrip = new BehaviorSubject<GiselaDataModel>(null);

    constructor(@Inject(ApiService) private apiService: ApiService) {
        // get current Positions from the API
        this.loadPositions();
    }


    /**
     * subscribe to apiService http-request
     */
    loadPositions() {
        this.apiService.getPositions().subscribe(
            positions => {
                // emit all the events that might have changed due to new positions
                this.totalDistanceChanged.next(this.getTotalDistanceTraveled(positions));
                this.positionsChanged.next(positions);
                this.currentTrip.next(this.getCurrentTrip(positions));
            },
            err => {
                // log errors if any
                console.log(err);
            });
    }

    /**
     * calculate the total distance traveled
     * @param positions
     */
    getTotalDistanceTraveled(positions: GiselaDataModel[]) {
        let totalDistance: number = 0;
        positions.forEach((entry: GiselaDataModel) => {
            if (moment(entry.start).isBefore(moment.now()) && moment(entry.end).isBefore(moment.now())) {
                // assume, that she came back the same way --> multiply by 2
                totalDistance += 2 * (entry.location.distanceFromHome);
            } else if (moment(entry.start).isBefore(moment.now()) && moment(entry.end).isAfter(moment.now())) {
                // gisela is currently traveling, assume, that she made it half way --> multiply by 1 (one-way)
                totalDistance += 1 * (entry.location.distanceFromHome);
            }
        });
        return this.numberWithThousandDevider(totalDistance);
    }

    getCurrentTrip(positions: GiselaDataModel[]) {
        let result: GiselaDataModel;
        positions.forEach((entry: GiselaDataModel) => {
            if (moment(entry.start).isBefore(moment.now()) && moment(entry.end).isAfter(moment.now())) {
                result = entry;
            }
        });
        return result;
    }

    numberWithThousandDevider(value: number) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
}
