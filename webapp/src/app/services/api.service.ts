import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LampStatus, SensorStatus, AreaStatus } from '../model';

/**
 * Service for making API requests related to lamps, sensors, and areas.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  /**
   * Constructs the ApiService with the HttpClient dependency injected.
   * @param http The HttpClient instance used for making HTTP requests.
   */
  constructor(private http: HttpClient) {}

  /**
   * Retrieves all lamps from the API.
   * @returns An observable of type LampStatus[] representing the list of lamps.
   */
  getAllLamps$() {
    return this.http.get<LampStatus[]>(`/lamps`);
  }

  /**
   * Retrieves all sensors from the API.
   * @returns An observable of type SensorStatus[] representing the list of sensors.
   */
  getAllSensors$() {
    return this.http.get<SensorStatus[]>(`/sensors`);
  }

  /**
   * Retrieves all areas from the API.
   * @returns An observable of type AreaStatus[] representing the list of areas.
   */
  getAllAreas$() {
    return this.http.get<AreaStatus[]>(`/areas`);
  }

  /**
   * Updates the status of a lamp in the API.
   * @param lampId The ID of the lamp to be updated.
   * @param newStatus The new status to be set for the lamp.
   * @returns An observable of type string representing the result of the update operation.
   */
  toggleLamp$(lampId: LampStatus['id'], newStatus: LampStatus['status']) {
    return this.http.put<string>(`/lamps/${lampId}/switch/${newStatus}`, null);
  }

  /**
   * Adds a new lamp to the API.
   * @param alias The alias of the new lamp.
   * @returns An observable of type LampStatus representing the newly added lamp.
   */
  addLamp$(alias: string) {
    return this.http.post<LampStatus>('/lamps', { alias });
  }

  /**
   * Adds a new sensor to the API.
   * @param alias The alias of the new sensor.
   * @param geoPos The geographic position of the new sensor.
   * @param actionRange The action range of the new sensor.
   * @returns An observable of type SensorStatus representing the newly added sensor.
   */
  addSensor$(alias: string, geoPos: string, actionRange: string) {
    return this.http.post<SensorStatus>('/sensors', { alias, geoPos, actionRange });
  }

  /**
   * Adds a new area to the API.
   * @param alias The alias of the new area.
   * @returns An observable of type AreaStatus representing the newly added area.
   */
  addArea$(alias: string) {
    return this.http.post<AreaStatus>('/areas', { alias });
  }
}
