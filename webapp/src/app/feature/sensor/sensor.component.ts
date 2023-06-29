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
 * Component for Sensor.
 * This component contains a form for adding a new sensor.
 * It interacts with the AppService to add new sensors and navigate back to the root route upon successful addition.
 */
@Component({
  selector: "app-sensor",
  templateUrl: "./sensor.component.html",
  styleUrls: ["./sensor.component.css"],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class SensorComponent {
  /**
   * Instance of the AppService.
   * This is used to interact with the backend.
   */
  appService = inject(AppService);

  /**
   * Instance of the Router.
   * This is used to navigate among routes.
   */
  router = inject(Router);

  /**
   * Instance of the FormBuilder.
   * This is used to create a reactive form for adding new sensors.
   */
  formBuilder = inject(FormBuilder);

  /**
   * Instance of the FormGroup.
   * This is used to create and manage the form controls.
   */
  formData = this.formBuilder.group({
    alias: this.formBuilder.control("", [Validators.required]),
    geoPos: this.formBuilder.control("", [Validators.required]),
    actionRange: this.formBuilder.control("", [Validators.required])
  });

  /**
   * An observable of the error status.
   * This is used to manage the error state of the component.
   */
  error$ = this.appService.error$;

  /**
   * Function to add a new sensor.
   * It retrieves the alias, geoPos, and actionRange values from the form and calls the addSensor$ method of the AppService.
   * Upon successful addition, it navigates back to the root route.
   */
  addSensor() {
    const alias = this.formData.get("alias").value;
    const geoPos = this.formData.get("geoPos").value;
    const actionRange = this.formData.get("actionRange").value;

    this.appService.addSensor$(alias, geoPos, actionRange)
      .subscribe((completed) => {
        if (completed) {
          this.router.navigate(["/"]);
        }
      });
  }
}
