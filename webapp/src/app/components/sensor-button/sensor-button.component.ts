// Importing Angular's common module
import { CommonModule } from "@angular/common";
// Necessary imports from Angular core
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
// Import from RxJS library
import { last } from "rxjs";
// Import for the SensorStatus model
import { SensorStatus } from "../../model";

/**
 * Component for Sensor Button.
 * This is a presentational component which receives data as an Input and emits events as Output.
 * It's responsible for displaying a single sensor status and emits events when actions are taken on it.
 * This component uses the OnPush change detection strategy.
 */
@Component({
  selector: 'app-sensor-button',
  templateUrl: './sensor-button.component.html',
  styleUrls: ['./sensor-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  standalone: true
})
export class SensorButtonComponent {
  /**
   * Property to enable dynamic properties addition to the component
   */
  [x: string]: any;

  /**
   * Input data of type SensorStatus.
   * This is passed in from a parent component and represents the status of a particular sensor.
   */
  @Input() data: SensorStatus;

  /**
   * Output EventEmitter to be emitted when sensor status is toggled.
   * It emits an event whenever a user interacts with this component.
   */
  @Output() toggleSensor = new EventEmitter<void>();

  /**
   * An RxJS operator that emits only the last value (complete) of an observable sequence.
   * It's protected and can be used within the component and its descendants.
   */
  protected readonly last = last;
}
