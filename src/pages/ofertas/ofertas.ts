import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { FavoritosProvider } from '../../providers/favoritos/favoritos';

/**
 * Generated class for the OfertasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ofertas',
  templateUrl: 'ofertas.html',
})
export class OfertasPage {
  ofertas;
  constructor(public navCtrl: NavController, public navParams: NavParams, private statusBar:StatusBar, private fav: FavoritosProvider) {
  }

  ionViewDidEnter(){
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleLightContent();
  }

  ionViewDidLoad() {
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleLightContent();
    this.get_favoritos();

  }

  get_favoritos(){
    this.fav.get_ofertas()
    .then(data => {
      this.ofertas = data;
      console.log(this.ofertas);
      
    })
  }

  proveedor(idusuario, correo){
    this.navCtrl.push('ProveedorPage',{
      idusuario: idusuario,
      correo: correo      
    });
  }
}
