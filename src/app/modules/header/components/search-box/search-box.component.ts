import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
} from '@angular/core';
import { env } from '../../../../../environments/environment';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent {
  focus = false;
  loading = false;
  users: object = [];
  awsImage: string = env.awsImage;

  constructor(
    private eRef: ElementRef) {
  }

  closeInput = (): void => {
    this.focus = false;
    this.users = [];
  }

  @HostListener('document:click', ['$event'])
  clickout = (e: any): void => {
    if (this.eRef.nativeElement.contains(e.target)) {
      this.focus = true;
    } else {
      this.closeInput();
    }
  }
}
