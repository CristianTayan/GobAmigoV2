import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';



@IonicPage()
@Component({
  selector: 'page-recomendados',
  templateUrl: 'recomendados.html',
})
export class RecomendadosPage {
  recomendados;
  lugares;
  searchTerm : any="";
  constructor(public navCtrl: NavController, public navParams: NavParams, private usuario:UsuarioProvider,
    public loadingCtrl:LoadingController, public statusBar: StatusBar, private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecomendadosPage');
    // this.get_recomendados();
    // this.get_proveedores_cercanos();
    this.getPosition();
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleLightContent();
  }
  ionViewDidEnter(){
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleLightContent();
  }

  setFilteredItems() {
    this.lugares = this.usuario.filterProveedoresCercanos(this.searchTerm);
  }

  get_recomendados(){
    this.usuario.get_recomendados()
    .then(data=>{
      this.recomendados = data;
      console.log(this.recomendados);

    })
  }

  getPosition() {
    this.geolocation.getCurrentPosition().then((geoposition: Geoposition)=>{
      // this.lat = geoposition.coords.latitude;
      // this.lon = geoposition.coords.longitude;
      this.get_proveedores_cercanos(geoposition.coords.latitude,geoposition.coords.longitude);

    });
  }

  get_proveedores_cercanos(coordenadax, coordenaday){
    var data = {};
    data['latitud'] = coordenadax;
    data['longitud'] = coordenaday;
    this.usuario.get_proveedores_cercanos(data)
    .then(data=>{
      this.lugares = data;
      console.log(this.lugares);

    })
  }


  proveedor(idusuario, correo){
    this.navCtrl.push('ProveedorPage',{
      idusuario: idusuario,
      correo: correo
    });
  }

}
