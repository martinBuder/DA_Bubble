import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { initializeApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { AppModule } from './app/app.module';
import { connectAuthEmulator, getAuth } from '@angular/fire/auth';




platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  