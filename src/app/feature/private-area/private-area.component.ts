// Angular's common module
import { CommonModule } from "@angular/common";
// Necessary imports from Angular core
import { Component, inject } from "@angular/core";
// Imports for the router directives
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
// Import for the AppService
import { AppService } from "../../services/app.service";

/**
 * Component for PrivateArea.
 * This component represents a private area of the application accessible to authenticated users.
 * It interacts with the AppService to manage the loading state of the application.
 */
@Component ({
  selector: "app-private-area",
  templateUrl: "./private-area.component.html",
  styleUrls: ["./private-area.component.css"],
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive]
})
export class PrivateAreaComponent {
  /**
   * Instance of the AppService.
   * This is used to interact with the backend.
   */
  appService = inject (AppService);

  /**
   * An observable of the loading status.
   * This is used to manage the loading state of the component.
   */
  loading$ = this.appService.loading$;
  
}
