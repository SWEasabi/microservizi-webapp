import { HttpStatusCode } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, catchError, delay, map, Observable, of, switchMap, tap } from "rxjs";
import { LampStatus, SensorStatus, AreaStatus } from "../model";
import { ApiService } from "./api.service";

interface Store {
  lamps: (LampStatus)[],
  sensors: (SensorStatus)[],
  areas: (AreaStatus)[],
  loading: boolean,
  firstLoad: boolean,
  error: string
}

const initialState: Store = {
  lamps: [],
  sensors: [],
  areas: [],
  loading: false,
  firstLoad: true,
  error: null
};

@Injectable({
  providedIn: "root"
})
export class AppService {

  api = inject(ApiService);

  $store = new BehaviorSubject<Store>(initialState);

  readonly lamps$ = this.$store.pipe(map(state => state.lamps));
  readonly sensors$ = this.$store.pipe(map(state => state.sensors));
  readonly areas$ = this.$store.pipe(map(state => state.areas));
  readonly error$ = this.$store.pipe(map(state => state.error));
  readonly loading$ = this.$store.pipe(map(state => state.loading), delay(0));
  readonly firstLoad$ = this.$store.pipe(map(state => state.firstLoad));

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



  private startLoading() {
    this.$store.next({
      ...this.$store.value,
      loading: true
    });
  }

  private stopLoading() {
    this.$store.next({
      ...this.$store.value,
      loading: false
    });
  }

  private setLampPending(lamp: LampStatus, pending: boolean) {
    this.$store.next({
      ...this.$store.value,
      lamps: this.$store.value.lamps.map(l => l.id === lamp.id ? { ...l, pending } : l)
    });
  }

  public toggleLamp(lamp: LampStatus) {
    this.setLampPending(lamp, true);
    this.api.toggleLamp$(lamp.id, lamp.status === "On" ? "Off" : "On")
      .subscribe({
        next: () => this.loadData()
      });
  }

  public toggleSensor(sensor: SensorStatus) {
    this.setLampPending(sensor, true);
    this.api.toggleLamp$(sensor.id, sensor.status === "On" ? "Off" : "On")
      .subscribe({
        next: () => this.loadData()
      });
  }



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

