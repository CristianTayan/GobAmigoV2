import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { StatusBar } from '@ionic-native/status-bar';

/**
 * Generated class for the FavoritosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favoritos',
  templateUrl: 'favoritos.html',
})
export class FavoritosPage {
  searchTerm: any;
  proveedores;
  constructor(public navCtrl: NavController, public navParams: NavParams, private usuarioProvider: UsuarioProvider, private statusBar: StatusBar) {

  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritosPage');
    this.mis_favoritos();
    this.statusBar.styleLightContent();
  }

  mis_favoritos() {
    var correo = localStorage.getItem('correo');
    this.usuarioProvider.mis_favoritos(correo)
    .then(data =>{
      this.proveedores = data;
    })
  }

  proveedor(idusuario, correo){
    this.navCtrl.push('ProveedorPage',{
      idusuario: idusuario,
      correo: correo      
    });
  }
  setFilteredItems() {
    this.proveedores = this.usuarioProvider.filterProveedores(this.searchTerm);
  }

}
