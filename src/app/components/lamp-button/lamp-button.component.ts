// Importando componenti necessari da Angular common
import { CommonModule } from "@angular/common";
// Import necessary da Angular core
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from "@angular/core";
// Importa last da RxJS
import { last } from "rxjs";
// Importa da modello LampStatus
import { LampStatus } from "src/app/model/LampStatus";
import { AppService } from "../../services/app.service";
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";


/**
 * Componente per Lamp Button.
 * Questo è un componente di presentazione che riceve dati come input ed emette eventi come output.
 * È responsabile della visualizzazione dello stato di una singola lampada ed emette eventi quando vengono intraprese azioni su di essa.
 * Questo componente utilizza la strategia di rilevamento delle modifiche OnPush.
 */
@Component ({
  selector: "app-lamp-button",
  templateUrl: "./lamp-button.component.html",
  styleUrls: ["./lamp-button.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true
})

export class LampButtonComponent {
  /**
   * Input data di tipo LampStatus.
   * Questo è passato da un componente genitore e rappresenta lo stato di una particolare lampada.
   */
  @Input () data: LampStatus;

  formBuilder = inject(FormBuilder);

  appService = inject(AppService);

  formData = this.formBuilder.group({
    luminosita: this.formBuilder.control("", [Validators.required])
  });

  error$ = this.appService.error$;

  /**
   * Output EventEmitter da emettere quando lo stato della lampada viene attivata.
   * Emette un evento ogni volta che un utente interagisce con la lampada.
   */
  @Output () toggleLamp = new EventEmitter<void> ();

  submitBrightness(){
    const luminosita = Number(this.formData.get("luminosita").value);
    this.appService.setLuminosita$(Number(this.data.id), luminosita)
      .subscribe((completed) => {
        if (completed) {
        }
      });
  }

  /**
   * Un operatore RxJS che emette solo l'ultimo valore (completo) di una sequenza osservabile.
   * E' protetto e può essere utilizzato all'interno del componente e dei suoi discendenti.
   */
  protected readonly last = last;
}
