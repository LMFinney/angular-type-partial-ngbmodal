import { Component } from '@angular/core';
import { take } from 'rxjs/operators';

import {
  CustomDialogComponent
} from './custom-dialog/custom-dialog.component';
import {
  ModalService
} from './modals/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  confirmedResult: boolean;
  inputResult: string;
  messageResult: boolean;
  customResult: string;

  constructor(private modalService: ModalService) { }

  openConfirm() {
    this.modalService.confirm(
      'Are you sure?'
    ).pipe(
      take(1) // take() manages unsubscription for us
    ).subscribe(result => {
        console.log({ confirmedResult: result });
        this.confirmedResult = result;
      });
  }

  openInput() {
    this.modalService.input(
      'What is your quest?', 'To seek the Holy Grail'
    ).pipe(
      take(1) // take() manages unsubscription for us
    ).subscribe(result => {
        console.log({ inputResult: result });
        this.inputResult = result;
      });
  }

  openMessage() {
    this.modalService.message(
      'My biscuits are burning!'
    ).pipe(
      take(1) // take() manages unsubscription for us
    ).subscribe(result => {
        console.log({ messageResult: result });
        this.messageResult = result;
      });
  }

  openCustomDialog() {
    this.modalService.custom<CustomDialogComponent, string>(
      CustomDialogComponent,
      { flavors: ['Vanilla', 'Chocolate', 'Rocky Road'] }
    ).pipe(
        take(1) // take() manages unsubscription for us
      ).subscribe(result => {
        console.log({ customResult: result });
        this.customResult = result;
      });
  }
}
