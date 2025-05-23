import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDGque-5gwxWMJJqxw_dF5_bpfIO54dw00',
  authDomain: 'myportfolio-457a1.firebaseapp.com',
  databaseURL: 'https://myportfolio-457a1-default-rtdb.firebaseio.com',
  projectId: 'myportfolio-457a1',
  storageBucket: 'myportfolio-457a1.appspot.com',
  messagingSenderId: '439582592540',
  appId: '1:439582592540:web:4258f4e2b86debd55719d9',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideClientHydration(),
    provideAnimations(),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideFirestore(() => getFirestore()),
    ]),
  ],
};
