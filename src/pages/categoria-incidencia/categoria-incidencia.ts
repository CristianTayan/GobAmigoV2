import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

/**
 * Generated class for the CategoriaIncidenciaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categoria-incidencia',
  templateUrl: 'categoria-incidencia.html',
})
export class CategoriaIncidenciaPage {
  iconos = [
    {
      idtipo: 1,
      titulo: 'TRÁNSITO',
      path: 'assets/imgs/transito_icon.png'
    },
    {
      idtipo: 2,
      titulo: 'COMUNIDAD',
      path: 'assets/imgs/comunidad_icon.png'
    },
    {
      idtipo: 3,
      titulo: 'SEGURIDAD',
      path: 'assets/imgs/seguridad_icon.png'
    },
    {
      idtipo: 4,
      titulo: 'CORRUPCIÓN',
      path: 'assets/imgs/corrupcion_icon.png'
    },
    {
      idtipo: 5,
      titulo: 'BULLYING',
      path: 'assets/imgs/bullying_icon.png'
    },
    {
      idtipo: 6,
      titulo: 'VIOLENCIA DE GENERO',
      path: 'assets/imgs/violencia_genero_icon.png'
    },
    {
      idtipo: 7,
      titulo: 'CONTAMINACIÓN',
      path: 'assets/imgs/contaminacion_icon.png'
    },
    {
      idtipo: 8,
      titulo: 'AMBIENTE',
      path: 'assets/imgs/ambiente_icon.png'
    },
    {
      idtipo: 9,
      titulo: 'ANIMALES',
      path: 'assets/imgs/animales_icon.png'
    }
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams, private statusBar: StatusBar) {
  }

  ionViewDidEnter(){
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleLightContent();
  }

  ionViewDidLoad() {
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleLightContent();
  }

  DenunciaPage(idtipo, titulo, path){
    this.navCtrl.push('DenunciaPage',{
      idtipo: idtipo,
      titulo: titulo,
      path: path
    })
  }

  cancelar(){
    this.navCtrl.setRoot('PrincipalPage');
  }

}
