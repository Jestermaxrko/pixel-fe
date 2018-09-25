import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
})

export class FeedComponent {
  @Input() user: String;
  @HostBinding('class') classes = 'feed';
}
