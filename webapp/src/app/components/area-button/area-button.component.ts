import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { last } from "rxjs";
import { AreaStatus } from "../../model";

@Component ({
  selector: "app-area-button",
  templateUrl: "./area-button.component.html",
  styleUrls: ["./area-button.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  standalone: true
  
})

export class AreaButtonComponent {
  
  @Input () data: AreaStatus;
  
  //@Output () toggleArea = new EventEmitter<void> ();
  
  protected readonly last = last;
}
