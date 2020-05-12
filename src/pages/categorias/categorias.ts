import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { CategoriasProvider } from '../../providers/categorias/categorias';



@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {
  categorias ;
  searchTerm : any="";
  loading = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private cat: CategoriasProvider, private statusBar: StatusBar) {
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleLightContent();
  }

  ionViewDidEnter(){
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleLightContent();
  }

  ionViewDidLoad() {
    this.getCategorias();
  }

  proveedores(idcategoria){
    this.navCtrl.push('BuscaloPage',{
      idcategoria:idcategoria
    });
  }

  getCategorias(){
    this.cat.getCategorias()
    .then(data => {
      this.loading = false;
      this.categorias = data;
      console.log(this.categorias);
      
    });
    this.loading= true;
  }

  setFilteredItems() {
    this.categorias = this.cat.filterItems(this.searchTerm);
  }

}
