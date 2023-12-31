import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnProfileComponent } from './own-profile.component';

describe('OwnProfileComponent', () => {
  let component: OwnProfileComponent;
  let fixture: ComponentFixture<OwnProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnProfileComponent]
    });
    fixture = TestBed.createComponent(OwnProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
