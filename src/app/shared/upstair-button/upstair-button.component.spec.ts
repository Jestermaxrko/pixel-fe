import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpstairButtonComponent } from './upstair-button.component';

describe('UpstairButtonComponent', () => {
  let component: UpstairButtonComponent;
  let fixture: ComponentFixture<UpstairButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpstairButtonComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpstairButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
