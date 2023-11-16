import { Injectable } from '@angular/core';
import { FireAuthService } from '../firebase/fire-auth.service';


@Injectable({
  providedIn: 'root'
})
export class CreateAccountService {

  profileName : string = 'Gast';
  profileImg : string = 'assets/img/avatars/person-0.png';
  email !: string;
  password !: string;

  constructor(
    private fireAuthService: FireAuthService,
  ) { }



  /**
   * create account on firebase
   */
  async createAccount() {
    await this.fireAuthService.createFireUser(this.email, this.password);
    await this.fireAuthService.updateFireUser( 'displayName', this.profileName);
    await this.fireAuthService.updateFireUser( 'photoURL', this.profileImg);
    await this.fireAuthService.createdAccountMessage();
    await this.fireAuthService.fireLogOut();
  }


}
