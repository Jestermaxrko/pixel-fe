import { Injectable  } from '@angular/core';
import { ModalState } from '../models/modal-window.state.model';
import { BehaviorSubject } from 'rxjs';
import 'rxjs/add/observable/of';

@Injectable({
  providedIn: 'root',
})

export class ModalWindowService {
  private readonly initialState: ModalState = {
    isOpen: false,
    modalName: '',
    payload: null,
  };

  state: BehaviorSubject<ModalState> = new BehaviorSubject<ModalState>(this.initialState);

  getModalState = () => this.state.asObservable();

  openModal = (modalName: string, payload?: any) => {
    this.state.next({ payload, modalName, isOpen: true });
  }

  closeModal = () => {
    this.state.next(this.initialState);
  }
}
