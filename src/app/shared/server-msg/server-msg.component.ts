import {
  Component,
  OnInit,
  Input
} from '@angular/core';

@Component({
  selector: 'app-server-msg',
  template: `
    <div class="server-msg">{{ msg }}</div>
  `
})
export class ServerMsgComponent implements OnInit {
  @Input() msg: string;
  @Input() type: string;
  ngOnInit() { }
}
