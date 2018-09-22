import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <router-outlet name='left'></router-outlet>
  `,
})

export class AppComponent {}
