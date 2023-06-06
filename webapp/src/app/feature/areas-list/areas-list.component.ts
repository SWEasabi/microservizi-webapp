import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, OnInit, TrackByFunction } from "@angular/core";
import { AreaButtonComponent } from "../../components/area-button/area-button.component";
import { AreaStatus } from "../../model";
import { AppService } from "../../services/app.service";

@Component ({
  selector: "app-areas-list",
  standalone: true,
  imports: [CommonModule, AreaButtonComponent],
  templateUrl: "./areas-list.component.html",
  styleUrls: ["./areas-list.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AreasListComponent implements OnInit {
  
  ngOnInit () {
    this.service.loadDataAreas();
  }
  
  service = inject (AppService);
  areas$ = this.service.areas$;
  loading$ = this.service.loading$;
  trackByAreaId: TrackByFunction<AreaStatus> = (index: number, area: AreaStatus) => area.id;
  
  // TODO: questo è un componente di tipo "container" e si interfaccia con il servizio
  // TODO: il componente "container" è responsabile di gestire gli eventi e di passare i dati al componente "presentational"
}
