import { Observable } from 'rxjs/Observable';

import { TestBed, inject } from '@angular/core/testing';
import { ApiService } from './api.service';
import { DataService } from './data.service';

const testDateString = '2017-01-01T00:00:00.000Z';
const testDate = new Date(testDateString);
const testDistance = 1000;

const mockPosition = {
  '_id': '11aa',
  'gCalID': 'gcalid1234',
  'start': testDate,
  'end': testDate,
  'summary': 'Rom',
  '__v': 0,
  'updated_at': testDate,
  'created_at': testDate,
  'location': {
    'name': 'Rome, Italy',
    'latitude': 41.9027835,
    'longitude': 12.4963655,
    'distanceFromHome': testDistance
  }
};

class MockApiService {
  getPositions(): Observable<any[]> {
    return Observable.create(function (obs: any) {
      obs.next([
        mockPosition,
        mockPosition,
        mockPosition
      ]);
    });
  }
}

export function main() {
  describe('DataService', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [],
        providers: [
          DataService,
          { provide: ApiService, useClass: MockApiService }
        ]
      });
    });

    describe('positionsChanged', () => {

      it('should emit when new positions are available', inject([DataService, ApiService],
        (dataService: DataService, apiService: MockApiService) => {
          dataService.positionsChanged.subscribe((positions) => {
            expect(positions.length).toBe(3); //see 3 mock responses above
          });
        })
      );
    });

    describe('totalDistanceChanged', () => {
      it('should show total distance', inject([DataService, ApiService],
        (dataService: DataService, apiService: MockApiService) => {
          dataService.totalDistanceChanged.subscribe((totalDistance: number) => {
            expect(totalDistance).toBe(3 * 2 * testDistance); //3 positions return trip
          });
        }
      ));
    });
  });
}
