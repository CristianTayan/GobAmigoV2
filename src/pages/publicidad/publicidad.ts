import { FavoritosProvider } from './../../providers/favoritos/favoritos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

/**
 * Generated class for the PublicidadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-publicidad',
  templateUrl: 'publicidad.html',
})
export class PublicidadPage {
  publicidad;
  constructor(public navCtrl: NavController, public navParams: NavParams, public favoritosProvider: FavoritosProvider, private statusBar:StatusBar) {
  }

  ionViewDidLoad() {
    this.get_anuncio();
    this.statusBar.styleLightContent();
  }

  get_anuncio(){
    this.favoritosProvider.publicidad()
    .then(res => {
      this.publicidad = res;
    })
  }
}
