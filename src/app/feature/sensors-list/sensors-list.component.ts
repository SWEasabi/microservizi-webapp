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
import { ChangeDetectionStrategy, Component, inject, OnInit, TrackByFunction } from "@angular/core";

import { SensorStatus } from "../../model";
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
export class SensorsListComponent implements OnInit {

  /**
   * Inizializza il componente e carica i dati dei sensori.
   *
   * @memberof SensorsListComponent
   */
  ngOnInit() {
    this.service.loadDataSensors();
  }

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

  /**
   * Cambia lo stato di un sensore invocando il metodo `toggleSensor` dell'`AppService`.
   *
   * @param {SensorStatus} sensor L'oggetto del sensore da attivare/disattivare.
   * @memberof SensorsListComponent
   */
  toggleSensor(sensor: SensorStatus) {
    this.service.toggleSensor(sensor);
  }
}
