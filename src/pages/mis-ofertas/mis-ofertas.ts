import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { StatusBar } from '@ionic-native/status-bar';
/**
 * Generated class for the MisOfertasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mis-ofertas',
  templateUrl: 'mis-ofertas.html',
})
export class MisOfertasPage {
  ofertas;
  limite_ofertas = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,private user: UsuarioProvider, public statusBar: StatusBar, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.mis_ofertas();
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleLightContent();
  }

  ionViewDidEnter() {
    this.mis_ofertas();
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleLightContent();
  }

  crear_oferta() {
    if(this.limite_ofertas < 5) {
      this.navCtrl.push('CrearOfertaPage');
    }else{
      this.limite_oferta();
    }
  }

  mis_ofertas() {
    var correo = localStorage.getItem('correo')
    this.user.mis_ofertas(correo)
      .then(data => {
        this.ofertas = data;
        this.limite_ofertas = this.ofertas.length;
        console.log(this.limite_ofertas);
        
      })
  }

  limite_oferta(){
    let alert = this.alertCtrl.create({
      title: 'Ohh...',
      subTitle: 'No puedes publicar mas ofertas maximo 5 ofertas',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  editar_oferta(idoferta){
    this.navCtrl.push('EditarOfertaPage',{
      idoferta: idoferta
    })
  }

}
