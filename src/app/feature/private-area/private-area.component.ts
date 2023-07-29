// Modulo comune di Angular
import { CommonModule } from "@angular/common";
// Import necessari dal core di Angular
import { Component, inject } from "@angular/core";
// Import per le direttive del router
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
// Import per l'AppService
import { AppService } from "../../services/app.service";

/**
 * Componente per l'Area Privata.
 * Questo componente rappresenta un'area privata dell'applicazione accessibile agli utenti autenticati.
 * Interagisce con l'AppService per gestire lo stato di caricamento dell'applicazione.
 */
@Component({
  selector: "app-private-area",
  templateUrl: "./private-area.component.html",
  styleUrls: ["./private-area.component.css"],
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive]
})
export class PrivateAreaComponent {
  /**
   * Istanza di AppService.
   * Viene utilizzata per interagire con il backend.
   */
  appService = inject(AppService);

  /**
   * Un osservabile dello stato di caricamento.
   * Viene utilizzato per gestire lo stato di caricamento del componente.
   */
  loading$ = this.appService.loading$;
}
