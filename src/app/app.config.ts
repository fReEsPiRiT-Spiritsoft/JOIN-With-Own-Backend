import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: '',
        appId: '',
        storageBucket: '',
        apiKey: '',
        authDomain: '',
        messagingSenderId: '',
        measurementId: '',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};
