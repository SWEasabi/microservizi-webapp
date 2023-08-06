/**
 * @module AuthService
 *
 * @description
 *
 * Il modulo `AuthService` fornisce funzionalità relative all'autenticazione.
 *
 * @example
 * import { AuthService } from './auth.service';
 *
 * // Crea una istanza dell' AuthService
 * const authService = new AuthService();
 *
 * // Controlla se l'utente è loggato
 * const loggedIn = authService.isLoggedIn();
 *
 * // Controlla se l'utente è autenticato
 * const authenticated = authService.isAuthenticated();
 *
 * // Recupera il token di autenticazione
 * const token = authService.getToken();
 *
 * // Esegue il logout dell'utente
 * authService.logout();
 *
 * // Esegue il login dell'utente
 * authService.login('username', 'password').subscribe(result => {
 *   // Gestisce il risultato del login
 * });
 */
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

/**
 * @class AuthService
 *
 * @description
 *
 * La classe `AuthService` fornisce funzionalità relative all'autenticazione.
 *
 * @usageNotes
 *
 * la classe `AuthService` può essere iniettata in un componente o in un servizio.
 */
@Injectable({
  providedIn: "root"
})
export class AuthService {

  private loggedIn = false;

  constructor() {
    if (this.isAuthenticated()) {
      this.loggedIn = true;
    }
  }

  /**
   * Controlla se l'utente è loggato.
   *
   * @returns Un valore booleano che indica se l'utente è loggato.
   */
  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  /**
   * Controlla se l'utente è autenticato.
   *
   * @returns un valore booleano che indica se l'utente è autenticato.
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  }

  /**
   * Recupera il token di autenticazione.
   *
   * @returns il token di autenticazione dal localstorage.
   */
  getToken(): string {
    return localStorage.getItem("token");
  }

  /**
   * Disconnette l'utente rimuovendo il token dal local storage e ricaricando la pagina.
   *
   * Dopo il logout, l'utente verrà reindirizzato alla pagina di autenticazione o a qualsiasi altra pagina desiderata.   */
  logout(): void {
    localStorage.removeItem("token");
    window.location.reload();
  }

  /**
   * Logga l'utente utilizzando le credenziali fornite.
   *
   * @param username - L'username dell'utente.
   * @param password - la password dell'utente.
   * @returns Un Observable<boolean> che indica se il login è andato a buon fine.
   */
  login(username: string, password: string): Observable<boolean> {
    localStorage.setItem("token", "blablabla");
    this.loggedIn = true;
    return of(true);
  }
}

