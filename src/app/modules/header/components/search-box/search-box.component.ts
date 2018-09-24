import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
} from '@angular/core';
import { env } from "../../../../../environments/environment";

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent implements OnInit {
  focus = false;
  loading = false;
  users: object = [ ];
  awsImage: string = env.awsImage;

  constructor(
    private eRef: ElementRef,
  ) { }

  ngOnInit() { }

  closeInput = (): boolean => this.focus = false;

  @HostListener('document:click', ['$event'])
  clickout = (e: any): void => {
    if (this.eRef.nativeElement.contains(e.target)) {
      this.focus = true;
    } else {
      this.users = [ ];
      this.focus = false;
    }
  }
}