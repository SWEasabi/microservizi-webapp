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
  ngOnInit () {
    this.service.loadDataSensors ();
  }
  
  service = inject (AppService);
  sensors$ = this.service.sensors$;
  loading$ = this.service.loading$;
  trackBySensorId: TrackByFunction<SensorStatus> = (index: number, sensor: SensorStatus) => sensor.id;
  
  // TODO: questo è un componente di tipo "container" e si interfaccia con il servizio
  // TODO: il componente "container" è responsabile di gestire gli eventi e di passare i dati al componente "presentational"
  toggleSensor (sensor: SensorStatus) {
    this.service.toggleSensor (sensor);
  }
}
