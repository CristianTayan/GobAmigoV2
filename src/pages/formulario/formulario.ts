import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the FormularioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-formulario',
  templateUrl: 'formulario.html',
})
export class FormularioPage {
texto;
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform:Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormularioPage');
  }

  enviar(){
    var numero = this.navParams.get('movil');
    var menssage = this.texto.split(" ").join("%20");
    let enviar = 'https://api.whatsapp.com/send?phone=' + 593 + numero + '&text=' + menssage;
    this.platform.ready().then(() => {
      let browser = new InAppBrowser();
      browser.create(enviar, '_system');
    });
  }

}
