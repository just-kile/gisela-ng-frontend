import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { GiselaDataModel } from './datamodels.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/**
 * This class represents the lazy loaded ApiService.
 */
@Injectable()
export class ApiService {

  devUrl = 'http://localhost:3000/positions';

  constructor(private http: Http) {
  }


  private coords: any[];

  // Fetch all existing comments
  getPositions(): Observable<any[]> {

    // ...using get request
    return this.http.get(this.devUrl)
    // ...and calling .json() on the response to return data
      .map((res:Response) => this.formatStringToTimestamps(res.json()))
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  /**
   * As Date().json() != Date() we have to reformat the timestamps from the backend for each provided timestamp
   * @param res
   * @returns {GiselaDataModel[]}
   */
  private formatStringToTimestamps(res: any) {
    let data:GiselaDataModel[] = res;
    data.forEach((entry:GiselaDataModel) => {
      entry.start = new Date(entry.start);
      entry.end = new Date(entry.end);
      entry.created_at = new Date(entry.created_at);
      entry.updated_at = new Date(entry.updated_at);
    });
    return data;
  }
}
