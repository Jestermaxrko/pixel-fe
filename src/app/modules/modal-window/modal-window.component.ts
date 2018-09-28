import { Component, Input, HostBinding } from '@angular/core';
import { ModalWindowService } from '../../../services/modal-window.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
})

export class ModalWindowComponent {
  @Input() modalName: string;
  @Input() payload: string;
  @HostBinding('class') classes = 'modal-window';

  constructor(
    private modalService: ModalWindowService,
    private router: Router) {
    this.router.events.subscribe((event) => {
      if (event.constructor.name === 'NavigationStart') {
        this.modalService.closeModal();
      }
    });
  }

  stopClosing = (e: Event): void => {
    e.stopPropagation();
  }
}
