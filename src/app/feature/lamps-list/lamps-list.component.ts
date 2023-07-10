// Angular's common module
import { CommonModule } from "@angular/common";
// Necessary imports from Angular core
import { ChangeDetectionStrategy, Component, inject, OnInit, TrackByFunction } from "@angular/core";
// Import for the LampButtonComponent
import { LampButtonComponent } from "../../components/lamp-button/lamp-button.component";
// Import for the LampStatus model
import { LampStatus } from "../../model";
// Import for the AppService
import { AppService } from "../../services/app.service";

/**
 * A list component for Lamps.
 * This component is responsible for managing events and passing data to the presentational component.
 * It interfaces with the AppService to load data and toggle lamp status.
 * This component uses the OnPush change detection strategy.
 */
@Component ({
  selector: "app-lamps-list",
  standalone: true,
  imports: [CommonModule, LampButtonComponent],
  templateUrl: "./lamps-list.component.html",
  styleUrls: ["./lamps-list.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LampsListComponent implements OnInit {
  /**
   * Implementation of the OnInit lifecycle hook
   * Here, the loadData method of the service is called.
   */
  ngOnInit () {
    this.service.loadData ();
  }
  
  /**
   * Instance of the AppService.
   * This is used to interact with the backend.
   */
  service = inject (AppService);

  /**
   * An observable of the lamps array.
   * This is used to keep track of the list of lamps in real time.
   */
  lamps$ = this.service.lamps$;

  /**
   * An observable of the loading status.
   * This is used to manage the loading state of the component.
   */
  loading$ = this.service.loading$;

  /**
   * Function to track lamps by id.
   * This helps Angular to optimize the rendering of lists.
   */
  trackByLampId: TrackByFunction<LampStatus> = (index: number, lamp: LampStatus) => lamp.id;
  
  /**
   * Method to toggle the status of a lamp.
   * This method makes use of the AppService to toggle the lamp.
   * @param lamp - The LampStatus instance to toggle
   */
  toggleLamp (lamp: LampStatus) {
    this.service.toggleLamp (lamp);
  }
}
