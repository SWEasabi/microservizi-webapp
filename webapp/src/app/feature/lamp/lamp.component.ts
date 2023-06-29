// Angular's common module
import { CommonModule } from "@angular/common";
// Necessary imports from Angular core
import { Component, inject } from "@angular/core";
// Imports for the form controls
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
// Import for the Router
import { Router, RouterModule } from "@angular/router";
// Import for the AppService
import { AppService } from "../../services/app.service";

/**
 * Component for Lamp.
 * This component contains a form for adding a new lamp.
 * It interacts with the AppService to add new lamps and navigate back to the root route upon successful addition.
 */
@Component ({
  selector: "app-lamp",
  templateUrl: "./lamp.component.html",
  styleUrls: ["./lamp.component.css"],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class LampComponent {
  /**
   * Instance of the AppService.
   * This is used to interact with the backend.
   */
  appService = inject (AppService);

  /**
   * Instance of the Router.
   * This is used to navigate among routes.
   */
  router = inject (Router);

  /**
   * Instance of the FormBuilder.
   * This is used to create a reactive form for adding new lamps.
   */
  formBuilder = inject (FormBuilder);

  /**
   * Instance of the FormGroup.
   * This is used to create and manage the form controls.
   */
  formData = this.formBuilder.group ({
    alias: this.formBuilder.control ("", [Validators.required])
  });

  /**
   * An observable of the error status.
   * This is used to manage the error state of the component.
   */
  error$ = this.appService.error$;
  
  /**
   * Function to add a new lamp.
   * It retrieves the alias value from the form and calls the addLamp$ method of the AppService.
   * Upon successful addition, it navigates back to the root route.
   */
  addLamp () {
    this.appService.addLamp$ (this.formData.get ("alias").value)
    .subscribe ((completed) => {
      if (completed) {
        this.router.navigate (["/"]);
      }
    });
  }
}
