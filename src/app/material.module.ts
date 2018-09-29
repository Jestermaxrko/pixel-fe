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
  MatExpansionModule,
  MatCardModule,
  MatBadgeModule,
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
    MatExpansionModule,
    MatCardModule,
    MatBadgeModule,
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
    MatExpansionModule,
    MatCardModule,
    MatBadgeModule,
  ],
})
export class MaterialModule { }
