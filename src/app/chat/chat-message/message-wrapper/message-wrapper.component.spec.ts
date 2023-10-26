import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageWrapperComponent } from './message-wrapper.component';

describe('MessageWrapperComponent', () => {
  let component: MessageWrapperComponent;
  let fixture: ComponentFixture<MessageWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageWrapperComponent]
    });
    fixture = TestBed.createComponent(MessageWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
