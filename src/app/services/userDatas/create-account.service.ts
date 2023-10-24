import { Injectable } from '@angular/core';
import { CheckInSiteServiceService } from '../generally/check-in-site-service.service';
import { UserDatasService } from './user-datas.service';
import { Auth } from '@angular/fire/auth';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { FireAuthService } from '../firebase/fire-auth.service';


@Injectable({
  providedIn: 'root'
})
export class CreateAccountService {

  profileName : string = 'Gast';
  profileImg : string = 'assets/img/avatars/person-0.png';
  email !: string;
  password !: string;

  errorMessage: string | null = null;
  successfulMessage: string | null = null;

  constructor(
    private fireAuthService: FireAuthService,
    public checkInSiteServiceService: CheckInSiteServiceService,
    public userDatasService: UserDatasService,
    public auth: Auth,
  ) { }

  firebaseApp = initializeApp(environment.firebase);


  /**
   * create account on firebase
   */
  async createAccount() {
    
  }
}
