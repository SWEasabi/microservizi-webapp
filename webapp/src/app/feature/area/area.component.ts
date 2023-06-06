import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { AppService } from "../../services/app.service";

@Component({
  selector: "app-area",
  templateUrl: "./area.component.html",
  styleUrls: ["./area.component.css"],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class AreaComponent {

  appService = inject(AppService);
  router = inject(Router);

  formBuilder = inject(FormBuilder);
  formData = this.formBuilder.group({
    alias: this.formBuilder.control("", [Validators.required])
  });
  error$ = this.appService.error$;

  addArea() {
    const alias = this.formData.get("alias").value;
    

    console.log(alias);

    this.appService.addArea$(alias)
      .subscribe((completed) => {
        if (completed) {
          this.router.navigate(["/"]);
        }
      });
  }
}
