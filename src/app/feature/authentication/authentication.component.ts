import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component ({
  selector: "app-authentication",
  templateUrl: "./authentication.component.html",
  styleUrls: ["./authentication.component.css"],
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule, FormsModule]
})
export class AuthenticationComponent implements OnInit {
  
  authService = inject (AuthService);
  router = inject (Router);
  formBuilder = inject (FormBuilder);
  formData = this.formBuilder.group ({
    username: this.formBuilder.control ("", [Validators.required]),
    password: this.formBuilder.control ("", [Validators.required])
  });
  errorMessage: string;
  
  ngOnInit () {
    localStorage.removeItem ("token");
  }
  
  login () {
    console.log ("aaa");
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
