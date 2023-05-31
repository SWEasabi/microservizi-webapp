import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { AppService } from "../../services/app.service";

@Component ({
  selector: "app-lamp",
  templateUrl: "./lamp.component.html",
  styleUrls: ["./lamp.component.css"],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class LampComponent {
  
  appService = inject (AppService);
  router = inject (Router);
  
  formBuilder = inject (FormBuilder);
  formData = this.formBuilder.group ({
    alias: this.formBuilder.control ("", [Validators.required])
  });
  error$ = this.appService.error$;
  
  addLamp () {
    console.log (this.formData.get ("alias"));
    this.appService.addLamp$ (this.formData.get ("alias").value)
    .subscribe ((completed) => {
      if (completed) {
        this.router.navigate (["/"]);
      }
    });
  }
}
