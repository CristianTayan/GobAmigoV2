import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {
  nombre
  correo;
  movil;
  acceso;
  foto;
  userInfo;
  img_empresa;
  idciudad;
  proveedor;
  identificacion;
  ciudades;
  myForm: FormGroup;
  constructor(public navCtrl: NavController, private fb:FormBuilder, public navParams: NavParams, private statusBar: StatusBar,private usuario: UsuarioProvider, private camera: Camera) {
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleDefault();

    this.myForm= this.fb.group({
      nombre: ['',Validators.compose([Validators.required])],
      correo: ['', Validators.compose([Validators.required, Validators.email])],
      identificacion: ['',Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(13)])],
      movil: ['',Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      proveedor: ['',Validators.compose([Validators.required])],
      idciudad:[''],
      acceso: ['',Validators.compose([Validators.required, Validators.minLength(8)])]
    })
  }
  ionViewDidEnter(){
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleDefault();
  }

  ionViewDidLoad() {
    this.get_ciudades();
  }

  get_ciudades(){
    this.usuario.get_ciudades()
    .then(data =>{
      this.ciudades = data;
    })

  }
  
  registro(){
    var data = {};
    data['nombre']=this.nombre;
    data['correo']=this.correo;
    data['identificacion'] = this.identificacion;
    data['movil']=this.movil;
    data['acceso']=this.acceso;
    data['proveedor']=this.proveedor;
    data['idciudad']=this.idciudad;
    data['foto']=this.foto;
    console.log(data);
    
    this.usuario.registrarUsuario(data)
    .then(res => {
      // this.navCtrl.setRoot('LoginPage');
      localStorage.setItem('foto', this.foto);
      localStorage.setItem('correo', this.correo);
      localStorage.setItem('nombre', this.nombre);
      localStorage.setItem('idciudad', this.idciudad);
      localStorage.setItem('identificacion', this.identificacion);
      this.verificar_proveedor();
    })
  }

  verificar_proveedor(){
    if (this.proveedor == 'S') {
      this.navCtrl.push('EmpresaMapaPage');
    }else{
      this.navCtrl.setRoot('LoginPage');
    }
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

}
