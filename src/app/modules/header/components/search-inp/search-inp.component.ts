import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { SearchApi } from '../../../../../api/search';
import { SearchUser } from './search-user.model';

@Component({
  selector: 'app-search-inp',
  template: `
    <input #input placeholder="Search" type="text" class="search__input"
      (keyup)="handleSearch(input.value)"
    >
  `,
})
export class SearchInpComponent implements OnInit {
  @ViewChild('input') inputRef: ElementRef;
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() users: EventEmitter<SearchUser[]> = new EventEmitter<SearchUser[]>();

  constructor(
    private searchApi: SearchApi,
  ) { }

  ngOnInit() {
    this.inputRef.nativeElement.focus();
    this.users.emit([]);
  }

  handleSearch = (value): void => {
    if (!value.length) {
      this.users.emit([ ]);
      return;
    }
    this.loading.emit(true);
    this.searchApi.searchUsers().subscribe(
      (res: any): void => {
        const users = res.users.filter((item: SearchUser): boolean => {
          return item.nickname.toUpperCase().indexOf(value.toUpperCase()) > -1;
        });
        this.users.emit(users);
        this.loading.emit(false);
      },
      (err): void => console.log(err),
    );
  }
}
