import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { AppService } from "../../services/app.service";

@Component({
  selector: "app-sensor",
  templateUrl: "./sensor.component.html",
  styleUrls: ["./sensor.component.css"],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class SensorComponent {

  appService = inject(AppService);
  router = inject(Router);

  formBuilder = inject(FormBuilder);
  formData = this.formBuilder.group({
    alias: this.formBuilder.control("", [Validators.required]),
    geoPos: this.formBuilder.control("", [Validators.required]),
    actionRange: this.formBuilder.control("", [Validators.required])

  });
  error$ = this.appService.error$;

  addSensor() {
    const alias = this.formData.get("alias").value;
    const geoPos = this.formData.get("geoPos").value;
    const actionRange = this.formData.get("actionRange").value;

    console.log(alias, geoPos, actionRange);

    this.appService.addSensor$(alias, geoPos, actionRange)
      .subscribe((completed) => {
        if (completed) {
          this.router.navigate(["/"]);
        }
      });
  }

}
