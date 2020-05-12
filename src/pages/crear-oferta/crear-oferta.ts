import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { UsuarioProvider } from '../../providers/usuario/usuario';

/**
 * Generated class for the CrearOfertaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crear-oferta',
  templateUrl: 'crear-oferta.html',
})
export class CrearOfertaPage {
  myForm: FormGroup;
  oferta;
  asunto;
  img_oferta;
  fecha_inicio;
  fecha_final;
  constructor(public navCtrl: NavController, public fb: FormBuilder, public navParams: NavParams, private statusBar: StatusBar, private camera: Camera, public api:UsuarioProvider) {

    this.myForm = this.fb.group({
      oferta: ['', Validators.compose([Validators.required])],
      asunto: ['', Validators.compose([Validators.required])],
      fecha_inicio:[],
      fecha_final: []
    })
  }

  ionViewDidLoad() {
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleLightContent();
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
        this.img_oferta = 'data:image/jpeg;base64,' + imageData;
      })
      .catch(error => {
        console.error(error);
      });
  }

  crear_oferta() {
    var data = {};
    data['idusuario'] = localStorage.getItem('idusuario');
    data['sesion'] = localStorage.getItem('correo');
    data['oferta'] = this.oferta;
    data['asunto'] = this.asunto;
    data['foto'] = this.img_oferta;
    data['fecha_inicio'] = this.fecha_inicio;
    data['fecha_final'] = this.fecha_final;
    this.api.registro_oferta(data)
    .then(data =>{
      console.log(data);
      this.navCtrl.pop();
    })
  }

}
