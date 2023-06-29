/**
 * @module AuthService
 *
 * @description
 *
 * The `AuthService` module provides authentication-related functionalities.
 *
 * @example
 * import { AuthService } from './auth.service';
 *
 * // Create an instance of the AuthService
 * const authService = new AuthService();
 *
 * // Check if the user is logged in
 * const loggedIn = authService.isLoggedIn();
 *
 * // Check if the user is authenticated
 * const authenticated = authService.isAuthenticated();
 *
 * // Get the authentication token
 * const token = authService.getToken();
 *
 * // Log out the user
 * authService.logout();
 *
 * // Log in the user
 * authService.login('username', 'password').subscribe(result => {
 *   // Handle the login result
 * });
 */
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

/**
 * @class AuthService
 *
 * @description
 *
 * The `AuthService` class provides authentication-related functionalities.
 *
 * @usageNotes
 *
 * The `AuthService` class should be injected into the desired components or services.
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
   * Checks if the user is logged in.
   *
   * @returns A boolean value indicating whether the user is logged in.
   */
  isLoggedIn(): boolean {
    return this.loggedIn;
  }
  
  /**
   * Checks if the user is authenticated.
   *
   * @returns A boolean value indicating whether the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  }
  
  /**
   * Retrieves the authentication token.
   *
   * @returns The authentication token stored in the local storage.
   */
  getToken(): string {
    return localStorage.getItem("token");
  }
  
  /**
   * Logs out the user by removing the token from the local storage and reloading the page.
   * 
   * After logging out, the user will be redirected to the authentication page or any other desired page.
   */
  logout(): void {
    localStorage.removeItem("token");
    window.location.reload();
  }
  
  /**
   * Logs in the user with the provided username and password.
   *
   * @param username - The username of the user.
   * @param password - The password of the user.
   * @returns An Observable<boolean> representing the login result.
   */
  login(username: string, password: string): Observable<boolean> {
    localStorage.setItem("token", "blablabla");
    this.loggedIn = true;
    return of(true);
  }
}