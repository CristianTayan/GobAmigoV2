import { UsuarioProvider } from './../../providers/usuario/usuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UpdateMetodoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update-metodo',
  templateUrl: 'update-metodo.html',
})
export class UpdateMetodoPage {
  forma_pago;
  constructor(public navCtrl: NavController, public navParams: NavParams, private usuariosProvider: UsuarioProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateMetodoPage');
  }

  actualizar(){
    var data = {};
    data['correo'] = localStorage.getItem('correo');
    data['forma_pago']= this.forma_pago;
    this.usuariosProvider.actualizar_metodo_pago(data)
    .then(res =>{
      console.log(res);
      this.navCtrl.pop();
    })

  }
}
