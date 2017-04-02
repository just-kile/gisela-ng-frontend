import {
  HttpModule,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { ApiService } from './api.service';

export function main() {
  describe('ApiService', () => {

    beforeEach(() => {

      TestBed.configureTestingModule({
        imports: [HttpModule],
        providers: [
          ApiService,
          { provide: XHRBackend, useClass: MockBackend }
        ]
      });
    });

    describe('getPositions()', () => {

      const testDateString = '2017-01-01T00:00:00.000Z';
      const testDate = new Date(testDateString);
      const mockResponse = [
        { 'start': testDateString, 'end': testDateString, 'updated_at': testDateString, 'created_at': testDateString },
        { 'start': testDateString, 'end': testDateString, 'updated_at': testDateString, 'created_at': testDateString },
        { 'start': testDateString, 'end': testDateString, 'updated_at': testDateString, 'created_at': testDateString }
      ];

      it('should return the same number of positions as the backend sends',
        inject([ApiService, XHRBackend], (apiService: ApiService, mockBackend: MockBackend) => {

          mockBackend.connections.subscribe((connection: any) => {
            connection.mockRespond(new Response(new ResponseOptions({
              body: JSON.stringify(mockResponse)
            })));
          });
          apiService.getPositions().subscribe((positions) => {
            expect(positions.length).toBe(3);
          });
        })
      );


      it('should parse all dates in the positions',
        inject([ApiService, XHRBackend], (apiService: ApiService, mockBackend: MockBackend) => {

          mockBackend.connections.subscribe((connection: any) => {
            connection.mockRespond(new Response(new ResponseOptions({
              body: JSON.stringify(mockResponse)
            })));
          });
          apiService.getPositions().subscribe((positions) => {
            expect(positions[0].start.toISOString()).toBe(testDate.toISOString());
            expect(positions[0].end.toISOString()).toBe(testDate.toISOString());
            expect(positions[0].updated_at.toISOString()).toBe(testDate.toISOString());
            expect(positions[0].created_at.toISOString()).toBe(testDate.toISOString());
          });
        })
      );


    });
  });
};
