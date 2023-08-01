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
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of, tap } from "rxjs";
import { PATHS } from "../app.constant";
import { LoginResult, LogoutResult } from "../model/AuthModel";

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
@Injectable ({
  providedIn: "root"
})
export class AuthService {

  private auth: LoginResult = null;

  constructor (private http: HttpClient) {
    this.loadAuthFromLocalStorage ();
  }

  /**
   * Controlla se l'utente è loggato.
   *
   * @returns Un valore booleano che indica se l'utente è loggato.
   */
  isLoggedIn (): boolean {
    return this.auth?.access?.length > 0;
  }

  /**
   * Recupera il token di autenticazione.
   *
   * @returns il token di autenticazione dal localstorage.
   */
  getToken (): string {
    return this.auth.access;
  }

  /**
   * Disconnette l'utente rimuovendo il token dal local storage e ricaricando la pagina.
   *
   * Dopo il logout, l'utente verrà reindirizzato alla pagina di autenticazione o a qualsiasi altra pagina desiderata.   */
  logout (): void {
    if (this.isLoggedIn ()) {
      this.http.post<LogoutResult> (PATHS.LOGOUT_PATH, this.auth).subscribe((result) => {
        if (result.status) {
          window.location.reload ();
        }
      });
    }
    this.auth = null;
    localStorage.removeItem ("auth");
  }

  /**
   * Logga l'utente utilizzando le credenziali fornite.
   *
   * @param username - L'username dell'utente.
   * @param password - la password dell'utente.
   * @returns Un Observable<boolean> che indica se il login è andato a buon fine.
   */
  login (username: string, password: string): Observable<boolean> {
    return this.http.post<LoginResult> (PATHS.LOGIN_PATH, { username, password })
    .pipe (
      tap ((result) => {
        if (result.access?.length > 0) {
          this.auth = result;
          localStorage.setItem ("auth", JSON.stringify(result));
        } else {
          this.auth = null;
        }
      }),
      map ((result) => result.access?.length > 0)
    );
  }
  private loadAuthFromLocalStorage () {
    const auth = localStorage.getItem ("auth");
    if (auth) {
      try {
        this.auth = JSON.parse (auth);
      } catch (e) {
        this.auth = null;
        localStorage.removeItem ("auth");
      }
    }
  }
}

