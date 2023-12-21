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
  
  editModus : boolean = false;

  constructor(
    public openCloseService: OpenCloseService,
    public fireAuthService: FireAuthService,
  ) {}

  public editProfileForm: FormGroup = new FormGroup({
    email: new FormControl(
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
      ],
      []
    ),
    name: new FormControl(
      '',
      [Validators.required, Validators.pattern(/^[a-zA-ZäöüÄÖÜß.-]+ [a-zA-Z0-9äöüÄÖÜß.-]+$/)],
      []
    ),
    password: new FormControl(
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?\-+'#()\/=}{§"!?&])[A-Za-z\d@$!%*?\-+'#()\/=}{§"!?&]+$/
        ),
        Validators.minLength(8),
      ],
      []
    ),
    terms: new FormControl('', [Validators.required], []),
  });

  closeOpenOwnProfile() {
    this.editModus = false;
    this.openCloseService.openOwnProfile = false;
  }

  openEditModus() {
    this.editModus = true;
  }

  saveEditedProfile() {
    
  }


}
