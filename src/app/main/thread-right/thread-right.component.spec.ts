import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadRightComponent } from './thread-right.component';

describe('ThreadRightComponent', () => {
  let component: ThreadRightComponent;
  let fixture: ComponentFixture<ThreadRightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThreadRightComponent]
    });
    fixture = TestBed.createComponent(ThreadRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
