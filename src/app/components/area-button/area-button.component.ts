// Integraizione di CommonModule
import { CommonModule } from "@angular/common";
// Import necessary da Angular core
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
// Import da RxJS
import { last } from "rxjs";
// Import da modello AreaStatus
import { AreaStatus } from "src/app/model/AreaStatus";

/**
 * Componente presentazionale che riceve dati come Input ed emette eventi come Output.
 * È responsabile della visualizzazione di un singolo stato dell'area e emette eventi quando vengono eseguite azioni su di esso.
 * Questo componente utilizza la strategia di rilevamento dei cambiamenti OnPush.
 */
@Component ({
  selector: "app-area-button",
  templateUrl: "./area-button.component.html",
  styleUrls: ["./area-button.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  standalone: true
})

export class AreaButtonComponent {
  /**
   * Dati in ingresso al componente.
   * Questo è passato da un componente genitore e rappresenta lo stato di una particolare area.
   */
  @Input () data: AreaStatus;

  /**
   * un operatore RxJS che emette solo l'ultimo valore (completo) di una sequenza osservabile.
   * È protetto e può essere utilizzato all'interno del componente e dei suoi discendenti.
   */
  protected readonly last = last;
}
