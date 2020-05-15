import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { StatusBar } from '@ionic-native/status-bar';

/**
 * Generated class for the PerfilEmpresaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil-empresa',
  templateUrl: 'perfil-empresa.html',
})
export class PerfilEmpresaPage {
  dataUsuario;
  nombre_negocio;
  slogan;
  productos;
  img_empresa;
  idcategoria_prod;
  coordenadax;
  coordenaday;
  dias_atencion;
  nombre_categoria;
  hora_apertura;
  hora_cierre;
  a_domicilio;
  forma_pago;
  constructor(public navCtrl: NavController, public navParams: NavParams, private usuarioProvider: UsuarioProvider, public statusBar: StatusBar) {
  }

  ionViewDidLoad() {
    this.get_empresa_info();
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleDefault();
  }
  ionViewDidEnter(){
    this.get_empresa_info();
  }

  update_foto_empresa(){
    this.navCtrl.push('UpdateFotoEmpresaPage');
  }

  get_empresa_info(){
    var correo = localStorage.getItem('correo');
    this.usuarioProvider.get_user_info(correo)
    .then(data =>{
      this.dataUsuario = data;
      console.log(this.dataUsuario);

      this.asignar_datos_a_variables(this.dataUsuario)
    })
  }

  asignar_datos_a_variables(datos){
    for (let item of datos) {
      this.nombre_negocio = item.nombre_negocio;
      this.slogan = item.slogan;
      this.productos = item.productos;
      this.idcategoria_prod = item.idcategoria_prod;
      this.img_empresa = item.img_empresa;
      this.dias_atencion = item.dias_atencion;
      this.hora_apertura = item.hora_apertura;
      this.hora_cierre = item.hora_cierre;
      this.nombre_categoria = item.nombre_categoria;
      this.a_domicilio = item.a_domicilio;
      this.forma_pago = item.categoria;
    }
  }

  editar_page(){
    this.navCtrl.push('EditarPerfilEmpresaPage');
  }

  update_metodo(){
    this.navCtrl.push('UpdateMetodoPage');
  }
}
