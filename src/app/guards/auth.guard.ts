import { inject, Injectable } from "@angular/core";
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Custom authentication guard per proteggere le rotte in base allo stato di autenticazione dell'utente.
 * Se l'utente non è autenticato, viene reindirizzato alla pagina di login.
 */
export function AuthGuard() {
  if (inject(AuthService).isLoggedIn()) {
    return true;
  } else {
    return inject(Router).navigate(['/login']); // Reindirizza alla pagina di login se non autenticato
  }
}
