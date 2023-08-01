// Modulo comune di Angular
import { CommonModule } from "@angular/common";
// Import necessario per le chiamate API
import { HttpClientModule } from "@angular/common/http";
// Import necessari dal core di Angular
import { Component, inject, OnInit } from "@angular/core";
// Import per i controlli del form
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
// Import per il Router
import { Router } from "@angular/router";
// Import per l'AuthService
import { AuthService } from "../../services/auth.service";

/**
 * Componente per l'Autenticazione.
 * Questo componente fornisce un form di login.
 * Interagisce con l'AuthService per autenticare un utente e navigare nell'area-new privata in caso di login avvenuto con successo.
 */
@Component({
  selector: "app-authentication",
  templateUrl: "./authentication.component.html",
  styleUrls: ["./authentication.component.css"],
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule, FormsModule]
})
export class AuthenticationComponent implements OnInit {

  /**
   * Istanza di AuthService.
   * Viene utilizzata per autenticare un utente.
   */
  authService = inject(AuthService);

  /**
   * Istanza del Router.
   * Viene utilizzata per navigare tra le route.
   */
  router = inject(Router);

  /**
   * Istanza del FormBuilder.
   * Viene utilizzata per creare un form reattivo per la funzionalità di login.
   */
  formBuilder = inject(FormBuilder);

  /**
   * Istanza del FormGroup.
   * Viene utilizzata per creare e gestire i controlli del form.
   */
  formData = this.formBuilder.group({
    username: this.formBuilder.control("Admin", [Validators.required]),
    password: this.formBuilder.control("5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8", [Validators.required])
  });

  /**
   * Una variabile per memorizzare il messaggio di errore.
   * Viene utilizzata per mostrare i messaggi di errore all'utente.
   */
  errorMessage: string;

  /**
   * Hook del ciclo di vita di Angular.
   * Rimuove il token dal local storage ogni volta che questo componente viene inizializzato.
   */
  ngOnInit() {
    this.authService.logout();
  }

  /**
   * Funzione per effettuare il login di un utente.
   * Recupera i dati dal form e chiama il metodo login dell'AuthService.
   * In caso di login avvenuto con successo, viene navigato nell'area-new privata.
   * Se il login fallisce, viene impostato il messaggio di errore.
   */
  login() {
    const credentials = this.formData.value;
    this.authService.login(credentials.username, credentials.password)
      .subscribe((logged) => {
        if (logged) {
          this.router.navigate(["/private-area-new"]);
        } else {
          this.errorMessage = "Credenziali non valide";
        }
      });
  }
}
