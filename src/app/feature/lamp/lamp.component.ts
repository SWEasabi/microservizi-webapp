// Modulo comune di Angular
import { CommonModule } from "@angular/common";
// Import necessari dal core di Angular
import { Component, inject } from "@angular/core";
// Import per i controlli del form
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
// Import per il Router
import { Router, RouterModule } from "@angular/router";
// Import per l'AppService
import { AppService } from "../../services/app.service";

/**
 * Componente per la Lampada.
 * Questo componente contiene un form per aggiungere una nuova lampada.
 * Interagisce con l'AppService per aggiungere nuove lampade e per navigare alla route principale in caso di aggiunta avvenuta con successo.
 */
@Component({
  selector: "app-lamp",
  templateUrl: "./lamp.component.html",
  styleUrls: ["./lamp.component.css"],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class LampComponent {
  /**
   * Istanza di AppService.
   * Viene utilizzata per interagire con il backend.
   */
  appService = inject(AppService);

  /**
   * Istanza del Router.
   * Viene utilizzata per navigare tra le route.
   */
  router = inject(Router);

  /**
   * Istanza del FormBuilder.
   * Viene utilizzata per creare un form reattivo per aggiungere nuove lampade.
   */
  formBuilder = inject(FormBuilder);

  /**
   * Istanza del FormGroup.
   * Viene utilizzata per creare e gestire i controlli del form.
   */
  formData = this.formBuilder.group({
    alias: this.formBuilder.control("", [Validators.required])
  });

  /**
   * Un osservabile dello stato di errore.
   * Viene utilizzato per gestire lo stato di errore del componente.
   */
  error$ = this.appService.error$;

  /**
   * Funzione per aggiungere una nuova lampada.
   * Recupera il valore dell'alias dal form e chiama il metodo addLamp$ dell'AppService.
   * In caso di aggiunta avvenuta con successo, viene navigato alla route principale.
   */
  addLamp() {
    this.appService.addLamp$(this.formData.get("alias").value)
      .subscribe((completed) => {
        if (completed) {
          this.router.navigate(["/"]);
        }
      });
  }
}
