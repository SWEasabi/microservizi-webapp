import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { AppService } from "../../services/app.service";

@Component ({
  selector: "app-private-area",
  templateUrl: "./private-area.component.html",
  styleUrls: ["./private-area.component.css"],
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive]
})
export class PrivateAreaComponent {
  appService = inject (AppService);
  loading$ = this.appService.loading$;
  
}
