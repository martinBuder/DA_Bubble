import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { initializeApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { AppModule } from './app/app.module';
import { connectAuthEmulator, getAuth } from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: environment.firebase.apiKey,
  authDomain: environment.firebase.authDomain,
  projectId: environment.firebase.projectId,
  storageBucket: environment.firebase.storageBucket,
  messagingSenderId: environment.firebase.messagingSenderId,
  appId: environment.firebase.appId,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
connectAuthEmulator(auth, 'http://localhost:9099');



platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
