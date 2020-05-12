import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DenunciaProvider } from '../../providers/denuncia/denuncia';
import { StatusBar } from '@ionic-native/status-bar';

/**
 * Generated class for the MisIncidenciasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mis-incidencias',
  templateUrl: 'mis-incidencias.html',
})
export class MisIncidenciasPage {
  denuncias;
  errorMessage: string;
  loading = true;
  count_denuncias = 0;
  value = 'hola';
  constructor(public navCtrl: NavController, public navParams: NavParams, private denuncia: DenunciaProvider, public statusBar:StatusBar) {
  }

  ionViewDidLoad() {
    this.getdenuncias();
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleLightContent();
  }

  ionViewDidEnter(){
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleLightContent();
  }

  getdenuncias() {
    var idusuario = localStorage.getItem('idusuario');
    var data = {};
    data['id_usuario_denuncia'] = idusuario;
    
    this.denuncia.getDenuncias(data)
    .then(
      data => {
        this.denuncias = data;  
        console.log(this.denuncias);

        if(this.denuncias.length == 0){
          this.count_denuncias = 1;
        }
      }
    )  
    // this.loading == true;      
  }

  getDenuncia(id_denuncia, coordenada_x_denuncia, coordenada_y_denuncia){
    this.navCtrl.push('MdenunciaPage',{
      id_denuncia : id_denuncia,
      coordenada_x_denuncia : coordenada_x_denuncia,
      coordenada_y_denuncia: coordenada_y_denuncia
    });

  } 

}
