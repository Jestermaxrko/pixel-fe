import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
})

export class FeedComponent {
  @Input() user: String;
  constructor() {

  }
}
