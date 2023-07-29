// Modulo comune di Angular
import { CommonModule } from "@angular/common";
// Import necessari dal core di Angular
import { ChangeDetectionStrategy, Component, inject, OnInit, TrackByFunction } from "@angular/core";
// Import per l'AreaButtonComponent
import { AreaButtonComponent } from "../../components/area-button/area-button.component";
// Import per il modello AreaStatus
import { AreaStatus } from "src/app/model/AreaStatus";
// Import per l'AppService
import { AppService } from "../../services/app.service";

/**
 * Componente lista per le Aree.
 * Questo componente si occupa di gestire gli eventi e passare i dati al componente presentazionale.
 * Interagisce con l'AppService per caricare i dati delle aree.
 * Questo componente utilizza la strategia di rilevamento dei cambiamenti OnPush.
 */
@Component({
  selector: "app-areas-list",
  standalone: true,
  imports: [CommonModule, AreaButtonComponent],
  templateUrl: "./areas-list.component.html",
  styleUrls: ["./areas-list.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AreasListComponent implements OnInit {
  /**
   * Implementazione dell'hook del ciclo di vita OnInit.
   * Qui viene chiamato il metodo loadDataAreas del servizio.
   */
  ngOnInit() {
    this.service.loadDataAreas();
  }

  /**
   * Istanza di AppService.
   * Viene utilizzata per interagire con il backend.
   */
  service = inject(AppService);

  /**
   * Un osservabile dell'array delle aree.
   * Viene utilizzato per tenere traccia della lista delle aree in tempo reale.
   */
  areas$ = this.service.areas$;

  /**
   * Un osservabile dello stato di caricamento.
   * Viene utilizzato per gestire lo stato di caricamento del componente.
   */
  loading$ = this.service.loading$;

  /**
   * Funzione per tracciare le aree per id.
   * Questo aiuta Angular ad ottimizzare il rendering delle liste.
   */
  trackByAreaId: TrackByFunction<AreaStatus> = (index: number, area: AreaStatus) => area.id;

  // Al momento, in questo componente non ci sono gestori di eventi.
  // Eventuali futuri eventi e i relativi gestori dovrebbero essere documentati qui.
}
