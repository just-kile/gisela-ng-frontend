/**
 * This represents the current state of the API-response for the called endpoint /positions
 */
export class GiselaDataModel {
  constructor (
    public gCalID: string,
    public start: Date,
    public end: Date,
    public location: LocationDataModel,
    public description: string,
    public summary: string,
    public created_at: Date,
    public updated_at: Date
  ) {}
}

/**
 * this represents the sub-object of the API-response for the called endpoint /positions
 */
export class LocationDataModel {
  constructor (
    public name: string,
    public latitude: number,
    public longitude: number,
    public distanceFromHome: number
  ) {}
}
