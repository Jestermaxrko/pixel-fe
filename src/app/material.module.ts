import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatListModule,
  MatDividerModule,
  MatSlideToggleModule,
} from '@angular/material';
import { NgModule } from '@angular/core';
import 'hammerjs';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatListModule,
    MatDividerModule,
    MatSlideToggleModule,
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatListModule,
    MatDividerModule,
    MatSlideToggleModule,
  ],
})
export class MaterialModule { }
