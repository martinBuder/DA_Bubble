import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageWindowComponent } from './message-window.component';

describe('MessaggeWindowComponent', () => {
  let component: MessageWindowComponent;
  let fixture: ComponentFixture<MessageWindowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageWindowComponent]
    });
    fixture = TestBed.createComponent(MessageWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
