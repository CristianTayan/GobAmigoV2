import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  nombre;
  correo;
  foto;
  movil;
  constructor(public navCtrl: NavController, private statusBar: StatusBar, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleDefault();
    this.asignar_datos();
  }
  ionViewDidEnter() {
    this.asignar_datos();
  }

  asignar_datos() {
    this.nombre = localStorage.getItem('nombre');
    this.correo = localStorage.getItem('correo');
    this.foto = localStorage.getItem('foto');
    this.movil = localStorage.getItem('movil');
  }

  abrir_ofertas() {
    this.navCtrl.push('OfertasPage');
  }

  update_foto_empresa() {
    this.navCtrl.push('UpdateFotoUsuarioPage');
  }

  editar_page() {
    this.navCtrl.push('EditarPerfilUsuarioPage');
  }

}
