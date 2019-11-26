import {Injectable} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MessageDialogComponent} from '../message-dialog/message-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class ConfirmationDialogService {

    constructor(private modalService: NgbModal) {
    }

    public confirm(
        title: string,
        message: string,
        btnOkText: string = 'YES',
        btnCancelText: string = 'Cancel',
        dialogSize: 'sm' | 'lg' = 'sm'): Promise<boolean> {
        const modalRef = this.modalService.open(MessageDialogComponent, {size: dialogSize});
        modalRef.componentInstance.title = title;
        modalRef.componentInstance.message = message;
        modalRef.componentInstance.btnOkText = btnOkText;
        modalRef.componentInstance.btnCancelText = btnCancelText;

        return modalRef.result;
    }
}
