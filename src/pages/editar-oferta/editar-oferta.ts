import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the EditarOfertaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-oferta',
  templateUrl: 'editar-oferta.html',
})
export class EditarOfertaPage {
  idoferta = this.navParams.get('idoferta');
  oferta;
  myForm: FormGroup;
  foto_oferta;
  constructor(public navCtrl: NavController,public fb: FormBuilder, public navParams: NavParams, private camera: Camera, private usuarioProvider: UsuarioProvider) {
    this.myForm = this.fb.group({
      oferta: ['', Validators.compose([Validators.required])],
      asunto: ['', Validators.compose([Validators.required])],
      fecha_inicio:[],
      fecha_final: []
    })
  }

  ionViewDidLoad() {
    this.editar_oferta();
  }

  editar_oferta(){
    this.usuarioProvider.editar_oferta(this.idoferta)
    .then(data =>{
      this.oferta = data;
      console.log(this.oferta);
      
    })
  }

  getPictureGallery() {
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      allowEdit: true,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 20
    }

    this.camera.getPicture(options)
      .then(imageData => {
        this.foto_oferta = 'data:image/jpeg;base64,' + imageData;
      })
      .catch(error => {
        console.error(error);
      });
  }

  actualizar_oferta(){
    console.log(this.oferta[0]);
    
    
    this.usuarioProvider.actualizar_oferta(this.idoferta, this.oferta[0])
    .then(data =>{
      this.navCtrl.pop();
    })
  }


}
