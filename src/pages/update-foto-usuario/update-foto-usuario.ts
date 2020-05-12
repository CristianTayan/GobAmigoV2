import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the UpdateFotoUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update-foto-usuario',
  templateUrl: 'update-foto-usuario.html',
})
export class UpdateFotoUsuarioPage {
  foto;
  dataUsuario;
  user;
  constructor(public navCtrl: NavController, public navParams: NavParams, private usuarioProvider: UsuarioProvider, public camera: Camera, public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateFotoUsuarioPage');
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
      this.foto = 'data:image/jpeg;base64,' + imageData;
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
      this.foto = item.foto;      
    }
  }

  actualizar_foto_empresa(){
    var data = {};
    data['correo'] = localStorage.getItem('correo');
    data['foto'] = this.foto;
    this.usuarioProvider.update_foto_usuario(data)
    .then(data =>{
      var foto = JSON.stringify(data);
      var dato = foto.replace(/['"]+/g, '');
      localStorage.setItem('foto', dato);
      this.createUser(dato);
      this.navCtrl.setRoot('PerfilPage');
    })
  }

  createUser(dato) {
    this.events.publish('foto:signedIn',
      this.user =
      localStorage.setItem('foto', dato)
    );
  }

}
