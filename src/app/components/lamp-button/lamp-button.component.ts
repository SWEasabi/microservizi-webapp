// Importing Angular's common module
import { CommonModule } from "@angular/common";
// Necessary imports from Angular core
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
// Import from RxJS library
import { last } from "rxjs";
// Import for the LampStatus model
import { LampStatus } from "../../model";

/**
 * Component for Lamp Button.
 * This is a presentational component which receives data as an Input and emits events as Output.
 * It's responsible for displaying a single lamp status and emits events when actions are taken on it.
 * This component uses the OnPush change detection strategy.
 */
@Component ({
  selector: "app-lamp-button",
  templateUrl: "./lamp-button.component.html",
  styleUrls: ["./lamp-button.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  standalone: true
})

export class LampButtonComponent {
  /**
   * Input data of type LampStatus.
   * This is passed in from a parent component and represents the status of a particular lamp.
   */
  @Input () data: LampStatus;
  
  /**
   * Output EventEmitter to be emitted when lamp status is toggled.
   * It emits an event whenever a user interacts with this component.
   */
  @Output () toggleLamp = new EventEmitter<void> ();

  /**
   * An RxJS operator that emits only the last value (complete) of an observable sequence.
   * It's protected and can be used within the component and its descendants.
   */
  protected readonly last = last;
}
