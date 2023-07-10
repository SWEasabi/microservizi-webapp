/**
 * The main service for managing application state.
 * Handles operations related to lamps, sensors, and areas, including
 * loading data from the API, managing errors, and updating state.
 */

import { HttpStatusCode } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, catchError, delay, map, Observable, of, switchMap, tap } from "rxjs";
import { LampStatus, SensorStatus, AreaStatus } from "../model";
import { ApiService } from "./api.service";

/**
 * Interface representing the application state store.
 * It contains arrays of lamps, sensors, and areas,
 * as well as loading and error flags.
 */
interface Store {
  /**
   * An array of lamp statuses representing the state of lamps in the application.
   */
  lamps: LampStatus[];
  /**
   * An array of sensor statuses representing the state of sensors in the application.
   */
  sensors: SensorStatus[];
  /**
   * An array of area statuses representing the state of areas in the application.
   */
  areas: AreaStatus[];
  /**
   * A flag indicating whether data is currently being loaded or fetched.
   */
  loading: boolean;
  /**
   * A flag indicating whether it is the first load of data.
   */
  firstLoad: boolean;
  /**
   * A string representing an error message in case of any errors.
   */
  error: string;
}


/**
 * Initial state for the application store.
 * Contains empty arrays for lamps, sensors, and areas,
 * and sets the loading and firstLoad flags to false.
 */
const initialState: Store = {
  lamps: [],
  sensors: [],
  areas: [],
  loading: false,
  firstLoad: true,
  error: null
};

/**
 * The main service for managing application state.
 * Handles operations related to lamps, sensors, and areas, including
 * loading data from the API, managing errors, and updating state.
 */
@Injectable({
  providedIn: "root"
})

export class AppService {

  /**
   * Inject the ApiService.
   */
  api = inject(ApiService);

  /**
   * Define the application's main state store as a BehaviorSubject.
   * This is an RxJS Subject that can emit new values to its subscribers
   * and has the characteristic that it will always return the last value emitted to new subscribers.
   * Here it's initialized with an initial state.
   */

  $store = new BehaviorSubject<Store>(initialState);
  /**
     * Define selectors for different pieces of state.
     */
  readonly lamps$ = this.$store.pipe(map(state => state.lamps));
  readonly sensors$ = this.$store.pipe(map(state => state.sensors));
  readonly areas$ = this.$store.pipe(map(state => state.areas));
  readonly error$ = this.$store.pipe(map(state => state.error));
  readonly loading$ = this.$store.pipe(map(state => state.loading), delay(0));
  readonly firstLoad$ = this.$store.pipe(map(state => state.firstLoad));

  /**
   * Load lamp data from the API.
   * Update the state with the new data, manage any errors,
   * and stop the loading spinner when complete.
   */
  public loadData() {
    this.startLoading();
    this.api.getAllLamps$()
      .subscribe({
        next: (lamps) => {
          this.$store.next({
            ...this.$store.value,
            lamps,
            firstLoad: false
          });
        },
        error: (error) => {
          this.manageError(error);
          this.stopLoading();
        },
        complete: () => {
          this.stopLoading();
        }
      });
  }
  /**
     * Load sensor data from the API.
     * Update the state with the new data, manage any errors,
     * and stop the loading spinner when complete.
     */
  public loadDataSensors() {
    this.startLoading();
    this.api.getAllSensors$()
      .subscribe({
        next: (sensors) => {
          this.$store.next({
            ...this.$store.value,
            sensors,
            firstLoad: false
          });
        },
        error: (error) => {
          this.manageError(error);
          this.stopLoading();
        },
        complete: () => {
          this.stopLoading();
        }
      });
  }
  /**
     * Load area data from the API.
     * Update the state with the new data, manage any errors,
     * and stop the loading spinner when complete.
     */
  public loadDataAreas() {
    this.startLoading();
    this.api.getAllAreas$()
      .subscribe({
        next: (areas) => {
          this.$store.next({
            ...this.$store.value,
            areas,
            firstLoad: false
          });
        },
        error: (error) => {
          this.manageError(error);
          this.stopLoading();
        },
        complete: () => {
          this.stopLoading();
        }
      });
  }


  /**
     * Start the loading spinner.
     */
  private startLoading() {
    this.$store.next({
      ...this.$store.value,
      loading: true
    });
  }
  /**
     * Stop the loading spinner.
     */
  private stopLoading() {
    this.$store.next({
      ...this.$store.value,
      loading: false
    });
  }
  /**
     * Update a lamp's pending status.
     * This is used to show that a lamp's status is being changed.
     */
  private setLampPending(lamp: LampStatus, pending: boolean) {
    this.$store.next({
      ...this.$store.value,
      lamps: this.$store.value.lamps.map(l => l.id === lamp.id ? { ...l, pending } : l)
    });
  }
  /**
     * Toggle a lamp's status.
     * Call the API to update the lamp's status,
     * then reload the lamp data to reflect the changes.
     */
  public toggleLamp(lamp: LampStatus) {
    this.setLampPending(lamp, true);
    this.api.toggleLamp$(lamp.id, lamp.status === "On" ? "Off" : "On")
      .subscribe({
        next: () => this.loadData()
      });
  }
  /**
     * Toggle a sensor's status.
     * Call the API to update the sensor's status,
     * then reload the sensor data to reflect the changes.
     */
  public toggleSensor(sensor: SensorStatus) {
    this.setLampPending(sensor, true);
    this.api.toggleLamp$(sensor.id, sensor.status === "On" ? "Off" : "On")
      .subscribe({
        next: () => this.loadData()
      });
  }

  /**
     * Manage errors.
     * Update the state with an appropriate error message based on the HTTP status code.
     */

  private manageError(error: any) {
    if (error.status === HttpStatusCode.NotFound) {
      this.$store.next({
        ...this.$store.value,
        error: "Not found"
      });
    } else {
      this.$store.next({
        ...this.$store.value,
        error: "Error"
      });
    }
  }
  /**
  * Add a new lamp with the provided alias.
  * Start the loading spinner, call the API to add the lamp,
  * then stop the loading spinner and reload the lamp data.
  * @param alias The alias of the new lamp.
  * @returns An observable that emits a boolean value indicating whether the lamp addition was successful.
  */
  public addLamp$(alias: string): Observable<boolean> {
    return of(true)
      .pipe(
        tap(() => this.startLoading()),
        switchMap(() => this.api.addLamp$(alias)),
        map(() => true),
        catchError(() => of(false)),
        tap(() => this.loadData())
      );
  }
  /**
   * Add a new sensor with the provided alias, geo position, and action range.
   * Start the loading spinner, call the API to add the sensor,
   * then stop the loading spinner and reload the sensor data.
   * @param alias The alias of the new sensor.
   * @param geoPos The geographic position of the new sensor.
   * @param actionRange The action range of the new sensor.
   * @returns An observable that emits a boolean value indicating whether the sensor addition was successful.
   */

  public addSensor$(alias: string, geoPos: string, actionRange: string): Observable<boolean> {
    return of(true)
      .pipe(
        tap(() => this.startLoading()),
        switchMap(() => this.api.addSensor$(alias, geoPos, actionRange)),
        map(() => true),
        catchError(() => of(false)),
        tap(() => this.loadData())
      );
  }
  /**
 * Add a new area with the provided alias.
 * Start the loading spinner, call the API to add the area,
 * then stop the loading spinner and reload the area data.
 * @param alias The alias of the new area.
 * @returns An observable that emits a boolean value indicating whether the area addition was successful.
 */
  public addArea$(alias: string): Observable<boolean> {
    return of(true)
      .pipe(
        tap(() => {
          this.startLoading()
        }),
        switchMap(() => this.api.addArea$(alias)),
        map(() => true),
        catchError(() => of(false)),
        tap(() => this.loadDataAreas())
      );
  }

}

