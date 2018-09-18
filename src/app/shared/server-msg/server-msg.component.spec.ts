import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerMsgComponent } from './server-msg.component';

describe('ServerMsgComponent', () => {
  let component: ServerMsgComponent;
  let fixture: ComponentFixture<ServerMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
