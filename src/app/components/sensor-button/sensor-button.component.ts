// Import del modulo CommonModule
import { CommonModule } from "@angular/common";
// Import necessari dal core di Angular
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
// Import necessari da RxJS
import { last } from "rxjs";
// Import del modello SensorStatus
import { SensorStatus } from "src/app/model/SensorStatus";

/**
 * Componente per il Pulsante del Sensore.
 * Questo è un componente di presentazione che riceve dati come input ed emette eventi come output.
 * È responsabile della visualizzazione dello stato di un singolo sensore ed emette eventi quando vengono intraprese azioni su di esso.
 * Questo componente utilizza la strategia di rilevamento dei cambiamenti OnPush.
 */
@Component({
  selector: 'app-sensor-button',
  templateUrl: './sensor-button.component.html',
  styleUrls: ['./sensor-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  standalone: true
})
export class SensorButtonComponent {
  /**
   * Proprietà per consentire l'aggiunta di proprietà dinamiche al componente.
   */
  [x: string]: any;

  /**
   * Dati in ingresso di tipo SensorStatus.
   * Questi dati vengono passati da un componente genitore e rappresentano lo stato di un sensore specifico.
   */
  @Input() data: SensorStatus;

  /**
   * Output EventEmitter per essere emesso quando lo stato del sensore viene modificato.
   * Emette un evento ogni volta che l'utente interagisce con questo componente.
   */
  @Output() toggleSensor = new EventEmitter<void>();

  /**
   * Un operatore RxJS che emette solo l'ultimo valore (completato) di una sequenza osservabile.
   * È protetto e può essere utilizzato all'interno del componente e dei suoi discendenti.
   */
  protected readonly last = last;
}
