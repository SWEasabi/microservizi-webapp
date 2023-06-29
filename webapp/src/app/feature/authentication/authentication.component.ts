// Angular's common module
import { CommonModule } from "@angular/common";
// Necessary for API calls
import { HttpClientModule } from "@angular/common/http";
// Necessary imports from Angular core
import { Component, inject, OnInit } from "@angular/core";
// Imports for the form controls
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
// Import for the Router
import { Router } from "@angular/router";
// Import for the AuthService
import { AuthService } from "../../services/auth.service";

/**
 * Component for Authentication.
 * This component provides a login form.
 * It interacts with the AuthService to authenticate a user and navigate to the private area upon successful login.
 */
@Component ({
  selector: "app-authentication",
  templateUrl: "./authentication.component.html",
  styleUrls: ["./authentication.component.css"],
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule, FormsModule]
})
export class AuthenticationComponent implements OnInit {
  
  /**
   * Instance of the AuthService.
   * This is used to authenticate a user.
   */
  authService = inject (AuthService);

  /**
   * Instance of the Router.
   * This is used to navigate among routes.
   */
  router = inject (Router);

  /**
   * Instance of the FormBuilder.
   * This is used to create a reactive form for the login functionality.
   */
  formBuilder = inject (FormBuilder);

  /**
   * Instance of the FormGroup.
   * This is used to create and manage the form controls.
   */
  formData = this.formBuilder.group ({
    username: this.formBuilder.control ("", [Validators.required]),
    password: this.formBuilder.control ("", [Validators.required])
  });

  /**
   * A variable to store error message.
   * This is used to display error messages to the user.
   */
  errorMessage: string;

  /**
   * Angular's lifecycle hook.
   * It removes the token from local storage whenever this component is initialized.
   */
  ngOnInit () {
    localStorage.removeItem ("token");
  }

  /**
   * Function to login a user.
   * It retrieves the form data and calls the login method of the AuthService.
   * Upon successful login, it navigates to the private area.
   * If login fails, it sets the errorMessage.
   */
  login () {
    const credentials = this.formData.value;
    this.authService.login (credentials.username, credentials.password)
    .subscribe ((logged) => {
      if (logged) {
        this.router.navigate (["/private-area"]);
      } else {
        this.errorMessage = "Invalid credentials";
      }
    });
  }
}
