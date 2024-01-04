import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FireAuthService } from 'src/app/services/firebase/fire-auth.service';
import { OpenCloseService } from 'src/app/services/generally/open-close.service';

@Component({
  selector: 'app-own-profile',
  templateUrl: './own-profile.component.html',
  styleUrls: ['./own-profile.component.scss']
})
export class OwnProfileComponent {

  editedName : string | undefined = undefined;
  editedMail : string | undefined = undefined;
  passwordForEdit : string | undefined = undefined;
  
  editModus : boolean = false;

  profilChanged() : boolean {
    return this.editProfileForm.valid
    && ((this.editProfileForm.value.email && this.editProfileForm.value.password) 
        || this.editProfileForm.value.name);
  }

  constructor(
    public openCloseService: OpenCloseService,
    public fireAuthService: FireAuthService,
  ) { }

  public editProfileForm: FormGroup = new FormGroup({
    name: new FormControl(
      '',
      [ 
        Validators.pattern(/^[a-zA-ZäöüÄÖÜß.-]+ [a-zA-Z0-9äöüÄÖÜß.-]+$/)],
      []
    ),
    email: new FormControl(
      '',
      [
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
      ],
      []
    ),
    password: new FormControl(
      '',
      [
        Validators.required,
      ],
      []
    ),
    // terms: new FormControl('', [Validators.required], []),
  });

  closeOpenOwnProfile() {
    this.editModus = false;
    this.openCloseService.openOwnProfile = false;
  }

  openEditModus() {
    this.editModus = true;
  }

  async saveEditedProfile() {
    this.setEditedProfileDatas();
    await this.updateFireUser();
    this.closeEditModus();
  }

  setEditedProfileDatas() {
    if(this.editProfileForm.value.name !== '')
      this.editedName = this.editProfileForm.value.name
    if(this.editProfileForm.value.email !== '')
      this.editedMail = this.editProfileForm.value.email
    this.passwordForEdit = this.editProfileForm.value.password;
    console.log('name = '+ this.editedName + ' mail = ' + this.editedMail);
    
  }

  async updateFireUser() {
    if(this.editedName)
      await this.fireAuthService.updateFireUser('displayName', this.editedName);
    if(this.editedMail && this.passwordForEdit) {
      await this.fireAuthService.updateFireAuthMail(this.editedMail, this.passwordForEdit);  
    }
     
      // await this.fireAuthService.updateFireUser('email', this.editedMail);    
  }

  closeEditModus() {
    this.editModus = false;
    this.editedName = undefined;
    this.editedMail = undefined;
    this.passwordForEdit = undefined;
  }

}
