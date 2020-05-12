import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { UsuarioProvider } from '../../providers/usuario/usuario';

/**
 * Generated class for the UpdateFotoEmpresaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update-foto-empresa',
  templateUrl: 'update-foto-empresa.html',
})
export class UpdateFotoEmpresaPage {
  img_empresa;
  dataUsuario;
  constructor(public navCtrl: NavController, public navParams: NavParams, public camera: Camera, private usuarioProvider: UsuarioProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateFotoEmpresaPage');
  }

  getPictureGallery(){
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      allowEdit:true,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 20
    }

    this.camera.getPicture( options )
    .then(imageData => {
      this.img_empresa = 'data:image/jpeg;base64,' + imageData;
    })
    .catch(error =>{
      console.error( error );
    });
  }

  get_empresa_info(){
    var correo = localStorage.getItem('correo');
    this.usuarioProvider.get_user_info(correo)
    .then(data =>{
      this.dataUsuario = data;
      console.log(this.dataUsuario);
      this.asignar_datos(this.dataUsuario);
      // this.asignar_datos_a_variables(this.dataUsuario)
    })
  }

  asignar_datos(datos){
    for (let item of datos) {
      this.img_empresa = item.img_empresa;      
    }
  }

  actualizar_foto_empresa(){
    var data = {};
    data['correo'] = localStorage.getItem('correo');
    data['img_empresa'] = this.img_empresa;
    this.usuarioProvider.update_foto_empresa(data)
    .then(data =>{
      this.navCtrl.setRoot('PerfilEmpresaPage');
    })
  }

}
