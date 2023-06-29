// Angular's common module
import { CommonModule } from "@angular/common";
// Necessary imports from Angular core
import { ChangeDetectionStrategy, Component, inject, OnInit, TrackByFunction } from "@angular/core";
// Import for the AreaButtonComponent
import { AreaButtonComponent } from "../../components/area-button/area-button.component";
// Import for the AreaStatus model
import { AreaStatus } from "../../model";
// Import for the AppService
import { AppService } from "../../services/app.service";

/**
 * A list component for Areas.
 * This component is responsible for managing events and passing data to the presentational component.
 * It interfaces with the AppService to load data.
 * This component uses the OnPush change detection strategy.
 */
@Component ({
  selector: "app-areas-list",
  standalone: true,
  imports: [CommonModule, AreaButtonComponent],
  templateUrl: "./areas-list.component.html",
  styleUrls: ["./areas-list.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AreasListComponent implements OnInit {
  /**
   * Implementation of the OnInit lifecycle hook
   * Here, the loadDataAreas method of the service is called.
   */
  ngOnInit () {
    this.service.loadDataAreas();
  }
  
  /**
   * Instance of the AppService.
   * This is used to interact with the backend.
   */
  service = inject (AppService);

  /**
   * An observable of the areas array.
   * This is used to keep track of the list of areas in real time.
   */
  areas$ = this.service.areas$;

  /**
   * An observable of the loading status.
   * This is used to manage the loading state of the component.
   */
  loading$ = this.service.loading$;

  /**
   * Function to track areas by id.
   * This helps Angular to optimize the rendering of lists.
   */
  trackByAreaId: TrackByFunction<AreaStatus> = (index: number, area: AreaStatus) => area.id;
  
  // As of now, there's no event management in this component.
  // Any future events and their handlers should be documented here.
}
