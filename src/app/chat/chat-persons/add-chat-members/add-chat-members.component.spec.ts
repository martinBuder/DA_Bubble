import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChatMembersComponent } from './add-chat-members.component';

describe('AddChatMembersComponent', () => {
  let component: AddChatMembersComponent;
  let fixture: ComponentFixture<AddChatMembersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddChatMembersComponent]
    });
    fixture = TestBed.createComponent(AddChatMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
