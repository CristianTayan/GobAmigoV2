import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Facebook } from '@ionic-native/facebook';
import { Camera} from '@ionic-native/camera';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { CallNumber } from '@ionic-native/call-number';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { SocialSharing } from '@ionic-native/social-sharing';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { HttpClientModule } from '@angular/common/http';
import { CategoriasProvider } from '../providers/categorias/categorias';
import { FavoritosProvider } from '../providers/favoritos/favoritos';
import { DenunciaProvider } from '../providers/denuncia/denuncia';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    Geolocation,
    GoogleMaps,
    Facebook,
    Camera,
    SplashScreen,
    CallNumber,
    InAppBrowser,
    NativeGeocoder,
    PhotoViewer,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioProvider,
    CategoriasProvider,
    FavoritosProvider,
    DenunciaProvider
  ]
})
export class AppModule {}
