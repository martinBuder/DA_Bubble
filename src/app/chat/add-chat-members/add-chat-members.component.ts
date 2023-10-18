import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OpenedChannelService } from 'src/app/services/opened-channel.service';
import { UserProfilesService } from 'src/app/services/user-profiles.service';

@Component({
  selector: 'app-add-chat-members',
  templateUrl: './add-chat-members.component.html',
  styleUrls: ['./add-chat-members.component.scss'],
})
export class AddChatMembersComponent {
  searchingUser: boolean = false;
  foundMembers: Array<any> = [];
  selectedProfiles: Array<string> = [];

  public chatAddMemberForm: FormGroup = new FormGroup({
    member: new FormControl('', [Validators.required], []),
  });

  constructor(
    public openedChannelService: OpenedChannelService,
    public userProfilesService: UserProfilesService
  ) {
    this.chatAddMemberForm.valueChanges.subscribe(
      this.searchChatMember.bind(this)
    );
  }

  /**
   * select and deselect a user to add
   *
   * @param userId profileId
   * @param i index for class
   */
  selectProfile(userId: string, i: number) {
    this.addSelectProfileClass(i);
    this.pushInSelectedProfiles(userId);
  }

  /**
   * add a class for show the selected profiles
   *
   * @param i
   */
  addSelectProfileClass(i: number) {
    let selected = document.getElementsByClassName('search-result')[i];
    if (selected.classList.contains('select-profile')) {
      selected.classList.remove('select-profile');
    } else {
      selected.classList.add('select-profile');
    }
  }

  /**
   * push or splice the user to selectedProfiles
   *
   * @param userId
   */
  pushInSelectedProfiles(userId: string) {
    const index = this.selectedProfiles.indexOf(userId);
    if (index === -1) this.selectedProfiles.push(userId);
    else this.selectedProfiles.splice(index, 1);
    console.log(this.selectedProfiles);
  }

  /**
   * push the selected Profiles to channel
   *
   * @param member
   */
  addChatMember() {}

  /**
   * search for members in allAppUsers
   *
   * @param jsonValue
   */
  searchChatMember(jsonValue: any) {
    let member = jsonValue.member.toLowerCase();
    if (member !== '') {
      this.foundMembers = this.userProfilesService.allAppUsers.filter(
        (profile) => profile.userName.toLowerCase().includes(member)
      );
      if (this.foundMembers.length > 0) {
        this.searchingUser = true;
      } else {
        this.searchingUser = true;
      }
    }
  }

  /**
   * check the conditions to give the button free
   *
   * @returns
   */
  isAddedButtonDisabled() {
    return !this.chatAddMemberForm.valid || this.selectedProfiles.length < 1;
  }
}
