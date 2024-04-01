import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { environment } from '../environments/environment'; // Importa el entorno


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideDatabase(() => getDatabase()),
    provideFirebaseApp(() => initializeApp({"projectId":"lecturad-3d871","appId":"1:122641220654:web:0b843f33bc462c47874bbf","databaseURL":"https://lecturad-3d871-default-rtdb.firebaseio.com","storageBucket":"lecturad-3d871.appspot.com","apiKey":"AIzaSyAcZ52x46-9RF4a5LFP0Yz_7ECMJAticIM","authDomain":"lecturad-3d871.firebaseapp.com","messagingSenderId":"122641220654"}))
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
