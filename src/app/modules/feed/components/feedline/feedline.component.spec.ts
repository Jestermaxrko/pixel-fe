import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedlineComponent } from './feedline.component';

describe('FeedlineComponent', () => {
  let component: FeedlineComponent;
  let fixture: ComponentFixture<FeedlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeedlineComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
