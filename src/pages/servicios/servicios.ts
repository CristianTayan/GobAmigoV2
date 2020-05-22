import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';


@IonicPage()
@Component({
  selector: 'page-servicios',
  templateUrl: 'servicios.html',
})
export class ServiciosPage {
  iconos = [
    {
      titulo: 'REQUISITOS TRAMITES',
      path: 'assets/imgs/tramites_icon.png',
      url: 'https://online.santodomingo.gob.ec/Requeriments/RequerimentsTypeView'
    },
    {
      titulo: 'CONSULTA DEUDAS',
      path: 'assets/imgs/deudas_icon.png',
      url: 'https://online.santodomingo.gob.ec/Debt/DebtViewHeader'
    },
    {
      titulo: 'ORDENANZAS MUNICIPALES',
      path: 'assets/imgs/ordenanzas_icon.png',
      url: 'https://www.santodomingo.gob.ec/?page_id=15695'
    }
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams,  private statusBar: StatusBar) {
  }


  ionViewDidLoad() {
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleLightContent();
    this.iconos;
  }
  ionViewDidEnter(){
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleLightContent();
  }

  // abrirPagina(url){
  //   var options = {
  //     location: 'yes',
  //     clearcache: 'yes',
  //     toolbar: 'no'
  //  };
  //   const browser = this.iab.create(url, '_self');
  //   browser.show();
  // }


  goToServicios(){
    this.navCtrl.push('WebviewPage');
  }

  goToConsultaDeudas(){
    this.navCtrl.push('ConsultaDeudasPage');
  }

  goToOrdenazasMunicipales(){
    this.navCtrl.push('OrdenanzasMunicipalesPage');
  }


}
