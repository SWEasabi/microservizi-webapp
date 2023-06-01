import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, OnInit, TrackByFunction } from "@angular/core";
import { LampButtonComponent } from "../../components/lamp-button/lamp-button.component";
import { LampStatus } from "../../model";
import { AppService } from "../../services/app.service";

@Component ({
  selector: "app-lamps-list",
  standalone: true,
  imports: [CommonModule, LampButtonComponent],
  templateUrl: "./lamps-list.component.html",
  styleUrls: ["./lamps-list.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LampsListComponent implements OnInit {
  
  ngOnInit () {
    this.service.loadData ();
  }
  
  service = inject (AppService);
  lamps$ = this.service.lamps$;
  loading$ = this.service.loading$;
  trackByLampId: TrackByFunction<LampStatus> = (index: number, lamp: LampStatus) => lamp.id;
  
  // TODO: questo è un componente di tipo "container" e si interfaccia con il servizio
  // TODO: il componente "container" è responsabile di gestire gli eventi e di passare i dati al componente "presentational"
  toggleLamp (lamp: LampStatus) {
    this.service.toggleLamp (lamp);
  }
}
