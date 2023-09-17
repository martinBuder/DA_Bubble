import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSiteComponent } from './chat-site.component';

describe('ChatSiteComponent', () => {
  let component: ChatSiteComponent;
  let fixture: ComponentFixture<ChatSiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatSiteComponent]
    });
    fixture = TestBed.createComponent(ChatSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
