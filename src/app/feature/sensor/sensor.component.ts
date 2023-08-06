// Modulo comune di Angular
import { CommonModule } from "@angular/common";
// Import necessari dal core di Angular
import { Component, inject } from "@angular/core";
// Import per i form controls
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
// Import per il Router
import { Router, RouterModule } from "@angular/router";
// Import per l'AppService
import { AppService } from "../../services/app.service";

/**
 * Componente per il sensore.
 * Questo componente contiene un form per aggiungere un nuovo sensore.
 * Interagisce con l'AppService per aggiungere nuovi sensori e navigare verso la route principale in caso di aggiunta avvenuta con successo.
 */
@Component({
  selector: "app-sensor",
  templateUrl: "./sensor.component.html",
  styleUrls: ["./sensor.component.css"],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class SensorComponent {
  /**
   * Istanza di AppService.
   * Viene utilizzata per interagire con il backend.
   */
  appService = inject(AppService);

  /**
   * Istanza di Router.
   * Viene utilizzata per navigare tra le route.
   */
  router = inject(Router);

  /**
   * Istanza di FormBuilder.
   * Viene utilizzata per creare un form reattivo per l'aggiunta di nuovi sensori.
   */
  formBuilder = inject(FormBuilder);

  /**
   * Istanza di FormGroup.
   * Viene utilizzata per creare e gestire i controlli del form.
   */
  formData = this.formBuilder.group({
    idarea: this.formBuilder.control("", [Validators.required]),
    latitudine: this.formBuilder.control("", [Validators.required]),
    longitudine: this.formBuilder.control("", [Validators.required]),
    actionRange: this.formBuilder.control("", [Validators.required])
  });

  /**
   * Un osservabile dello stato di errore.
   * Viene utilizzato per gestire lo stato di errore del componente.
   */
  error$ = this.appService.error$;

  /**
   * Funzione per aggiungere un nuovo sensore.
   * Recupera i valori di alias, latitudine e actionRange dal form e chiama il metodo addSensor$ dell'AppService.
   * In caso di aggiunta avvenuta con successo, naviga verso la route principale.
   */
  addSensor() {
    const idarea = Number(this.formData.get("idarea").value);
    const latitudine = Number(this.formData.get("latitudine").value);
    const longitudine = Number(this.formData.get("longitudine").value);
    const raggio = Number(this.formData.get("actionRange").value);

    this.appService.addSensor$(idarea, latitudine, longitudine, raggio)
      .subscribe((completed) => {
        if (completed) {
          this.router.navigate(["/"]);
        }
      });
  }
}
