import { Component } from '@angular/core';
import { Action } from '../../node_modules/rxjs/internal/scheduler/Action';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
  <router-outlet></router-outlet>
  `
})

export class AppComponent {}
