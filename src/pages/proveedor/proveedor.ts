import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { CategoriasProvider } from '../../providers/categorias/categorias';
import { FavoritosProvider } from '../../providers/favoritos/favoritos';
import { UsuarioProvider } from '../../providers/usuario/usuario';

/**
 * Generated class for the ProveedorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-proveedor',
  templateUrl: 'proveedor.html',
})
export class ProveedorPage {
  mensaje;
  celular_proveedor = '987028436'
  idusuario = this.navParams.get('idusuario');
  
  proveedor;
  correo = this.navParams.get('correo');
  // favorito ;
  es_favorito;
  es_recomendado;
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public toastCtrl: ToastController, public usuarioProvider: UsuarioProvider,
    private callNumber: CallNumber, private statusBar: StatusBar, private categoria: CategoriasProvider, private favoritoProvider: FavoritosProvider) {

  }

  ionViewDidLoad() {
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleLightContent();
    console.log(this.idusuario);
    this.get_user_info();
    this.isfavorito();
    this.agregar_visto();
    this.isrecomendado()
  }

  agregar_visto() {
    var data = {};
    data['idusuario'] = this.idusuario;
    data['sesion'] = localStorage.getItem('correo');
    this.usuarioProvider.agregar_visto(data)
      .then(data => {
        console.log(data);

      })
  }

  agregar_recomendado() {
    this.es_recomendado = 'Si';
    var data = {};
    data['idusuario'] = this.idusuario;
    data['sesion'] = localStorage.getItem('correo');
    this.usuarioProvider.agregar_recomendado(data)
      .then(data => {
        console.log(data);

      })
  }

  isrecomendado() {

    var data = {};
    data['idusuario'] = this.idusuario;
    data['sesion'] = localStorage.getItem('correo');
    this.usuarioProvider.es_recomendado(data)
      .then(data => {
        this.es_recomendado = data;
        console.log(this.es_recomendado);
      })
  }

  isfavorito() {
    var userid = localStorage.getItem('idusuario');
    var data = {};
    data['idusuario'] = userid;
    data['idnegocio'] = this.idusuario;

    this.favoritoProvider.es_favorito(data)
      .then(data => {
        this.es_favorito = data;
        console.log(this.es_favorito);

      })
  }

  get_user_info() {
    this.categoria.get_user_info(this.correo)
      .then(data => {
        this.proveedor = data;
        console.log(this.proveedor);
      })

  }

  like() {
    var userid = localStorage.getItem('idusuario');
    var correo = localStorage.getItem('correo');
    this.es_favorito = 'si';
    var data = {};
    data['idusuario'] = userid;
    data['idnegocio'] = this.idusuario;
    data['correo'] = correo;
    this.favoritoProvider.like(data)
      .then(data => {
        console.log(data);
      })
  }

  dislike() {
    var userid = localStorage.getItem('idusuario');
    this.es_favorito = 'no';
    var data = {};
    data['idusuario'] = userid;
    data['idnegocio'] = this.idusuario;
    this.favoritoProvider.dislike(data)
      .then(data => {
        console.log(data);
      })

  }

  sendmessage(numero) {
    var menssage = this.mensaje.split(" ").join("%20");
    let enviar = 'https://api.whatsapp.com/send?phone=' + 593 + numero + '&text=' + menssage;
    this.platform.ready().then(() => {
      let browser = new InAppBrowser();
      browser.create(enviar, '_system');
    });
  }

  message(numero) {
    var texto = "Porfavor, seria tan amable de ayudarme con la cotizacion de:"
    var menssage = texto.split(" ").join("%20");
    let enviar = 'https://api.whatsapp.com/send?phone=' + 593 + numero + '&text=' + menssage;
    this.platform.ready().then(() => {
      let browser = new InAppBrowser();
      browser.create(enviar, '_system');
    });
  }

  llamar(numero) {
    this.callNumber.callNumber(numero, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  cotizar(){
    this.navCtrl.push('FormularioPage');
  }
}
