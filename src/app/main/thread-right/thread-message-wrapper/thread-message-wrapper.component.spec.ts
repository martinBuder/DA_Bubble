import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadMessageWrapperComponent } from './thread-message-wrapper.component';

describe('ThreadMessageWrapperComponent', () => {
  let component: ThreadMessageWrapperComponent;
  let fixture: ComponentFixture<ThreadMessageWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThreadMessageWrapperComponent]
    });
    fixture = TestBed.createComponent(ThreadMessageWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
