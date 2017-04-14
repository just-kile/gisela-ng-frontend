import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ApiService } from './api.service';
import { GiselaDataModel } from './datamodels.model';

/**
 * This class represents the lazy loaded DataService.
 */
@Injectable()
export class DataService {

  // the event-Emitter the frontend should listen to for changes from the backend
  public positionsChanged = new BehaviorSubject<GiselaDataModel[]>([]);
  public totalDistanceChanged = new BehaviorSubject<number>(0.0);

  constructor( @Inject(ApiService) private apiService: ApiService) {
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
      },
      err => {
        // log errors if any
        console.log(err);
      });
  }

  /**
   *
   * @param positions
   */
  getTotalDistanceTraveled(positions: GiselaDataModel[]) {
    let totalDistance: number = 0;
    positions.forEach((entry: GiselaDataModel) => {
      // assume, that she came back the same way --> multiply by 2
      totalDistance += 2 * (entry.location.distanceFromHome);
    });
    return totalDistance;
  }
}
