// Angular's common module
import { CommonModule } from "@angular/common";
// Necessary imports from Angular core
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
// Import from RxJS library
import { last } from "rxjs";
// Import for the AreaStatus model
import { AreaStatus } from "../../model";

/**
 * Component for Area Button.
 * This is a presentational component which receives data as an Input and emits events as Output.
 * It's responsible for displaying a single area status and emits events when actions are taken on it.
 * This component uses the OnPush change detection strategy.
 */
@Component ({
  selector: "app-area-button",
  templateUrl: "./area-button.component.html",
  styleUrls: ["./area-button.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  standalone: true
})

export class AreaButtonComponent {
  /**
   * Input data of type AreaStatus.
   * This is passed in from a parent component and represents the status of a particular area.
   */
  @Input () data: AreaStatus;

  /**
   * An RxJS operator that emits only the last value (complete) of an observable sequence.
   * It's protected and can be used within the component and its descendants.
   */
  protected readonly last = last;
}
