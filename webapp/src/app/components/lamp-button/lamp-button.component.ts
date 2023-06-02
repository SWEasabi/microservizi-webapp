import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { last } from "rxjs";
import { LampStatus } from "../../model";

@Component ({
  selector: "app-lamp-button",
  templateUrl: "./lamp-button.component.html",
  styleUrls: ["./lamp-button.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  standalone: true
  
})

export class LampButtonComponent {
  
  @Input () data: LampStatus;
  
  @Output () toggleLamp = new EventEmitter<void> ();
  
  protected readonly last = last;
}
