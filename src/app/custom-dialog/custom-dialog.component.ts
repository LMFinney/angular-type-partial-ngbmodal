import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-custom-dialog',
  template: `
<div>
  <div class="modal-header">
    <h4 class="modal-title">Ice Cream Chooser</h4>
  </div>
  <div class="modal-body">
    <p>What flavor do you want?</p>
    <div>
      <p *ngFor="let flavor of flavors">
        <label><input [formControl]="choice"
          [value]="flavor"
          type="radio">{{flavor}}</label>
      </p>
    </div>

  </div>
  <div class="modal-footer">
    <button type="button"
      class="btn btn-outline-dark"
      (click)="activeModal.close()">Cancel</button>
    <button type="button"
      class="btn btn-outline-dark"
      [class.disabled]="choice.invalid"
      [disabled]="choice.invalid"
      (click)="activeModal.close(choice.value)">OK</button>
  </div>
</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomDialogComponent {
  flavors: string[];
  choice = new FormControl('', Validators.required);

  constructor(public activeModal: NgbActiveModal) {
  }
}
