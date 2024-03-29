// Modulo comune di Angular
import { CommonModule } from "@angular/common";
// Import necessari dal core di Angular
import { Component, inject } from "@angular/core";
// Import per i controlli del form
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
// Import per il Router
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { Area } from "../../model/AreaStatus";
// Import per l'AppService
import { AppService } from "../../services/app.service";

/**
 * Componente per le Aree.
 * Questo componente contiene un form per aggiungere una nuova area.
 * Interagisce con l'AppService per aggiungere nuove aree e tornare alla root route in caso di aggiunta riuscita.
 */
@Component({
  selector: "app-area",
  templateUrl: "./area.component.html",
  styleUrls: ["./area.component.css"],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class AreaComponent {

  activetedRoute = inject(ActivatedRoute)
  /**
   * Istanza di AppService.
   * Viene utilizzata per interagire con il backend.
   */
  appService = inject(AppService);

  /**
   * Istanza del Router.
   * Viene utilizzata per navigare tra le rotte.
   */
  router = inject(Router);

  /**
   * Istanza del FormBuilder.
   * Viene utilizzata per creare un form reattivo per aggiungere nuove aree.
   */
  formBuilder = inject(FormBuilder);

  /**
   * Istanza del FormGroup.
   * Viene utilizzata per creare e gestire i controlli del form.
   */
  formData = this.formBuilder.group({
    nome: [null, [Validators.required]],
    lvlInf: [null, [Validators.required]],
    lvlSup: [null, [Validators.required]],
    automode: [false, [Validators.required]],
  });

  /**
   * Un osservabile dello stato di errore.
   * Viene utilizzato per gestire lo stato di errore del componente.
   */
  error$ = this.appService.error$;

  /**
   * Funzione per aggiungere una nuova area.
   * Recupera il valore dell'alias dal form e chiama il metodo addArea$ di AppService.
   * In caso di aggiunta riuscita, naviga alla root route.
   */
  addArea() {
    this.appService.addArea$(this.formData.getRawValue())
      .subscribe((completed) => {
        if (completed) {
          this.router.navigate(["../all"], { relativeTo: this.activetedRoute });
        }
      });
  }
}
