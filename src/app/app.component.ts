import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  favoritos:any = 'FavoritosPage';
  registro:any = 'RegistroPage';
  soy_empresa:any = 'PerfilEmpresaPage';
  login:any = 'LoginPage';
  perfil:any = 'PerfilPage';
  seguimiento:any = 'MisIncidenciasPage';
  incidencias:any = 'CategoriaIncidenciaPage';
  mis_ofertas:any = 'MisOfertasPage';
  sobre_gob_amigo: any = 'SobreGobAmigoPage';





  @ViewChild('contenido') menu: NavController;
  foto;
  correo;
  nombre;
  estaLogueado = false;
  userData;
  proveedor;
  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public menuCtrl: MenuController,public events: Events) {
    platform.ready().then(() => {
      splashScreen.hide();
      
      events.subscribe('user:signedIn', (userEventData) => {
        this.userData = localStorage.getItem('userStorage');
        var usuario = JSON.parse(this.userData);
        for (let item of usuario) {
          this.foto = item.foto;
          this.nombre = item.nombre;
          this.correo = item.correo;  
          this.proveedor = item.proveedor;        
        }     
       });

       events.subscribe('foto:signedIn', (userEventData) => {
        this.foto = localStorage.getItem('foto');   
       });

       events.subscribe('nombre:signedIn', (userEventData) => {
        this.nombre = localStorage.getItem('nombre');   
       });
    });
    this.foto = localStorage.getItem('foto');
    this.correo = localStorage.getItem('correo');
    this.nombre = localStorage.getItem('nombre');
    this.proveedor = localStorage.getItem('proveedor')
  }

  openPage(pagina){
    this.menu.setRoot(pagina);
    this.menuCtrl.close();
  }

  cerrar_sesion(){
    localStorage.clear();
    this.menu.setRoot('LoginPage');
    this.menuCtrl.enable(false);
    this.events.unsubscribe('user:signedIn', (userEventData) => {

    });
    this.platform.exitApp();
  }
  
}

