import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable ({
  providedIn: "root"
})
export class AuthService {
  
  constructor () {
    if (this.isAuthenticated ()) {
      this.loggedIn = true;
    }
  }
  
  private loggedIn = false;
  
  isLoggedIn (): boolean {
    return this.loggedIn;
  }
  isAuthenticated (): boolean {
    return !!localStorage.getItem ("token");
  }
  
  getToken (): string {
    return localStorage.getItem ("token");
  }
  
  logout (): void {
    // Remove token from local storage or cookie
    localStorage.removeItem ("token");
    window.location.reload ();
    // Redirect to authentication page or any other desired page
  }
  
  login (username: string, password: string): Observable<boolean> {
    localStorage.setItem ("token", "blablabla");
    this.loggedIn = true;
    return of (true);
  }
}
