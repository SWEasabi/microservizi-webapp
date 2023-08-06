// Modulo comune di Angular
import { CommonModule } from "@angular/common";
// Import necessari dal core di Angular
import { ChangeDetectionStrategy, Component, inject, OnInit, TrackByFunction } from "@angular/core";
// Import per il componente LampButtonComponent
import { LampButtonComponent } from "../../components/lamp-button/lamp-button.component";
// Import per il modello LampStatus
import { LampStatus } from "src/app/model/LampStatus";
// Import per l'AppService
import { AppService } from "../../services/app.service";

/**
 * Un componente di lista per le lampade.
 * Questo componente è responsabile della gestione degli eventi e del passaggio dei dati al componente presentazionale.
 * Interagisce con l'AppService per caricare i dati e per cambiare lo stato delle lampade.
 * Questo componente utilizza la strategia di rilevamento dei cambiamenti OnPush.
 */
@Component({
  selector: "app-lamps-list",
  standalone: true,
  imports: [CommonModule, LampButtonComponent],
  templateUrl: "./lamps-list.component.html",
  styleUrls: ["./lamps-list.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LampsListComponent implements OnInit {
  /**
   * Implementazione del hook del ciclo di vita OnInit.
   * Qui viene chiamato il metodo loadData del servizio.
   */
  ngOnInit() {
    this.service.loadData();
  }

  /**
   * Istanza di AppService.
   * Viene utilizzata per interagire con il backend.
   */
  service = inject(AppService);

  /**
   * Un osservabile dell'array di lampade.
   * Viene utilizzato per tenere traccia della lista di lampade in tempo reale.
   */
  lamps$ = this.service.lamps$;

  /**
   * Un osservabile dello stato di caricamento.
   * Viene utilizzato per gestire lo stato di caricamento del componente.
   */
  loading$ = this.service.loading$;

  /**
   * Funzione per tracciare le lampade in base all'id.
   * Questo aiuta Angular ad ottimizzare il rendering delle liste.
   */
  trackByLampId: TrackByFunction<LampStatus> = (index: number, lamp: LampStatus) => lamp.id;

  /**
   * Metodo per cambiare lo stato di una lampada.
   * Questo metodo utilizza l'AppService per cambiare lo stato della lampada.
   * @param lamp - L'istanza di LampStatus da cambiare

  toggleLamp(lamp: LampStatus) {
    this.service.toggleLamp(lamp);
  }
  */
}
