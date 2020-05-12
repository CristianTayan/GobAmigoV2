import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { StatusBar } from '@ionic-native/status-bar';
import { GoogleMap } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the RecomendadosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recomendados',
  templateUrl: 'recomendados.html',
})
export class RecomendadosPage {
  map: GoogleMap;
  recomendados;
  lugares;
  coordenadax;
  coordenaday;
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

  getPosition(): void{
    const loader = this.loadingCtrl.create({
      content: "Obteniendo tu ubicación...",
      duration: 6000
    });
    loader.present();
    this.geolocation.getCurrentPosition().then((resp) => {
      this.coordenadax = resp.coords.latitude
      this.coordenaday = resp.coords.longitude
      this.get_proveedores_cercanos(this.coordenadax, this.coordenaday)
     }).catch((error) => {
       console.log('Error getting location', error);
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
