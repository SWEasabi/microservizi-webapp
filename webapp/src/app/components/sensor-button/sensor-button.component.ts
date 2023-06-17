import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { last } from "rxjs";
import { SensorStatus } from "../../model";

@Component({
  selector: 'app-sensor-button',
  templateUrl: './sensor-button.component.html',
  styleUrls: ['./sensor-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  standalone: true
})
export class SensorButtonComponent {
[x: string]: any;
  @Input() data: SensorStatus;

  @Output() toggleSensor = new EventEmitter<void>();

  protected readonly last = last;
}
