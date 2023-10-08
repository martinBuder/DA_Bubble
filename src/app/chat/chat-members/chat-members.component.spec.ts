import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMembersComponent } from './chat-members.component';

describe('ChatMembersComponent', () => {
  let component: ChatMembersComponent;
  let fixture: ComponentFixture<ChatMembersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatMembersComponent]
    });
    fixture = TestBed.createComponent(ChatMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
