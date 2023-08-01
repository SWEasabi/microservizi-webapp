/**
 * @module SensorsListComponent
 * @description
 *
 * Il componente `SensorsListComponent` è un componente contenitore che interagisce con l'`AppService`
 * per gestire i dati e gli eventi dei sensori.
 * È responsabile del caricamento dei dati dei sensori, del cambio dello stato dei sensori e del passaggio dei dati al componente presentazionale.
 *
 * @usage
 *
 * ```html
 * <app-sensors-list></app-sensors-list>
 * ```
 *
 * @selector `app-sensors-list`
 *
 * @export
 * @class SensorsListComponent
 * @implements {OnInit}
 */
import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, TrackByFunction } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, Subject, takeUntil } from "rxjs";

import { SensorStatus } from "src/app/model/SensorStatus";
import { AppService } from "../../services/app.service";
import { SensorButtonComponent } from "src/app/components/sensor-button/sensor-button.component";

@Component({
  selector: 'app-sensors-list',
  templateUrl: './sensors-list.component.html',
  styleUrls: ['./sensors-list.component.css'],
  standalone: true,
  imports: [CommonModule, SensorButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SensorsListComponent implements OnInit, OnDestroy {

  #destroy = new Subject<void>();

  /**
   * Inizializza il componente e carica i dati dei sensori.
   *
   * @memberof SensorsListComponent
   */
  ngOnInit() {
    const areaId = this.activetedRoute.snapshot.queryParamMap.get("areaId") != null ? Number(this.activetedRoute.snapshot.queryParamMap.get("areaId")) : undefined;

    this.service.loadDataSensors(areaId);
    this.activetedRoute.queryParamMap
    .pipe(
      map(queryParams => queryParams.get("areaId")),
      takeUntil(this.#destroy)
    ).subscribe(params => {
      const _areaId = params != null ? Number(params) : undefined;
      this.service.loadDataSensors(_areaId);
    })
  }
  activetedRoute = inject(ActivatedRoute);

  /**
   * Inietta l'`AppService` per comunicare con il backend e gestire i dati dei sensori.
   *
   * @type {AppService}
   * @memberof SensorsListComponent
   */
  service = inject(AppService);

  /**
   * Rappresenta i dati dei sensori come un flusso di osservabili.
   *
   * @type {*}
   * @memberof SensorsListComponent
   */
  sensors$ = this.service.sensors$;

  /**
   * Rappresenta lo stato di caricamento come un flusso di osservabili.
   *
   * @type {*}
   * @memberof SensorsListComponent
   */
  loading$ = this.service.loading$;

  /**
   * Definisce una funzione di tracciamento (track by) per la direttiva ngFor per migliorare le prestazioni di rendering.
   * Utilizza l'ID del sensore come identificatore univoco.
   *
   * @memberof SensorsListComponent
   */
  trackBySensorId: TrackByFunction<SensorStatus> = (index: number, sensor: SensorStatus) => sensor.id;

  ngOnDestroy (): void {
    this.#destroy.next();
    this.#destroy.complete();
  }

}
