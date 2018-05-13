import { Injectable, Type } from '@angular/core';
import {
  NgbModal,
  NgbModalOptions
} from '@ng-bootstrap/ng-bootstrap';
import { Observable, from, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {
  ConfirmDialogComponent
} from './confirm-dialog/confirm-dialog.component';
import {
  InputDialogComponent
} from './input-dialog/input-dialog.component';
import {
  MessageDialogComponent
} from './message-dialog/message-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private ngbModal: NgbModal) { }

  confirm(
    prompt = 'Really?', title = 'Confirm'
  ): Observable<boolean> {
    return this.custom<ConfirmDialogComponent, boolean>(
      ConfirmDialogComponent, { title, prompt });
  }

  input(
    message: string, initialValue: string, title = 'Input'
  ): Observable<string> {
    return this.custom<InputDialogComponent, string>(
      InputDialogComponent, { title, initialValue, message });
  }

  message(
    message: string, title = 'Message'
  ): Observable<boolean> {
    return this.custom<MessageDialogComponent, boolean>(
      MessageDialogComponent, { title, message });
  }

  custom<T, R>(
    content: Type<T>,
    config?: Partial<T>,
    options?: NgbModalOptions
  ): Observable<R> {
    // we use a static backdrop by default,
    // but allow the user to set anything in the options
    const modal = this.ngbModal.open(
      content,
      { backdrop: 'static', ...options }
    );

    // copy the config values (if any) into the component
    Object.assign(modal.componentInstance, config);

    return from(modal.result).pipe(
      catchError(error => {
        console.warn(error);
        return of(undefined);
      })
    );
  }
}
