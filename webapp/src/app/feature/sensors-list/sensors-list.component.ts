/**
 * @module SensorsListComponent
 * @description
 * 
 * The `SensorsListComponent` is a container component that interacts with the `AppService` to manage sensor data and events.
 * It is responsible for loading sensor data, toggling sensor status, and passing data to the presentational component.
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
   * Initializes the component and loads sensor data.
   *
   * @memberof SensorsListComponent
   */
  ngOnInit() {
    this.service.loadDataSensors();
  }

  /**
   * Injects the `AppService` to communicate with the backend and manage sensor data.
   *
   * @type {AppService}
   * @memberof SensorsListComponent
   */
  service = inject(AppService);

  /**
   * Represents the sensor data as an observable stream.
   *
   * @type {*}
   * @memberof SensorsListComponent
   */
  sensors$ = this.service.sensors$;

  /**
   * Represents the loading state as an observable stream.
   *
   * @type {*}
   * @memberof SensorsListComponent
   */
  loading$ = this.service.loading$;

  /**
   * Defines a track by function for the ngFor directive to improve rendering performance.
   * Uses the sensor's ID as the unique identifier.
   *
   * @memberof SensorsListComponent
   */
  trackBySensorId: TrackByFunction<SensorStatus> = (index: number, sensor: SensorStatus) => sensor.id;

  /**
   * Toggles the status of a sensor by invoking the `toggleSensor` method of the `AppService`.
   *
   * @param {SensorStatus} sensor The sensor object to toggle.
   * @memberof SensorsListComponent
   */
  toggleSensor(sensor: SensorStatus) {
    this.service.toggleSensor(sensor);
  }
}
