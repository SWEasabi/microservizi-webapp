import { inject, Injectable } from "@angular/core";
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export function AuthGuard () {
  if (inject(AuthService).isLoggedIn()) {
      return true;
    } else {
      return inject(Router).navigate(['/login']); // Redirect to the login page if not logged in
    }
}
