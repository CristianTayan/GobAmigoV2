import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { CategoriasProvider } from '../../providers/categorias/categorias';

/**
 * Generated class for the BuscaloPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buscalo',
  templateUrl: 'buscalo.html',
})
export class BuscaloPage {

  proveedores;
  searchTerm : any="";
  idcategoria = this.navParams.get('idcategoria');

  constructor(public navCtrl: NavController, public navParams: NavParams, private cat: CategoriasProvider) {
  
  }

  ionViewDidLoad() {
    this.getProveedores();
  }

  setFilteredItems() {
    this.proveedores = this.cat.filterProveedores(this.searchTerm);
  }

  proveedor(idusuario, correo){
    this.navCtrl.push('ProveedorPage',{
      idusuario: idusuario,
      correo: correo      
    });
  }

  getProveedores(){
    this.cat.getProveedores(this.idcategoria)
    .then(data => {
      this.proveedores = data;
      console.log(this.proveedores);
      
    });
  }

}
