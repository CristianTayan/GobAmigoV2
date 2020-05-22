import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { DenunciaProvider } from '../../providers/denuncia/denuncia';

@IonicPage()
@Component({
  selector: 'page-denuncia',
  templateUrl: 'denuncia.html',
})
export class DenunciaPage {
  idtipo =  this.navParams.get('idtipo');
  titulo =  this.navParams.get('titulo');
  path   =  this.navParams.get('path');
  geoLatitude: number;
  geoLongitude: number;
  geoAddress: string;
  geoAccuracy;
  categorias;
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  options: CameraOptions = {
    quality: 20,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    cameraDirection:0
  }
  tipo_denuncia;
  denuncia;
  imagen;
  detalle_denuncia;
  clickedImagePath:any;
  loading = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public loadingCtrl: LoadingController, 
     private camera: Camera, private geolocation: Geolocation, private statusBar: StatusBar, private api: DenunciaProvider) {
       console.log(this.idtipo);
       
  }

  ionViewDidLoad() {
    this.getCategoriaById();
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleLightContent();
    this.getGeolocation();
  }
  goBack(){
    this.navCtrl.pop();
  }

  ionViewDidEnter(){
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleLightContent();
  }

  getCategoriaById(){
    this.api.getCategoriaById(this.idtipo)
    .then(data => {
      this.categorias = data;
    });
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
      this.clickedImagePath = 'data:image/jpeg;base64,' + imageData;
    })
    .catch(error =>{
      console.error( error );
    });
  }

  clickImage(){
    this.camera.getPicture(this.options).then((imageData) => {
      this.imagen= 'data:image/jpeg;base64,' + imageData;
      this.clickedImagePath = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
      // Handle error
     });
  }

  getGeolocation() {
    this.geolocation.getCurrentPosition().then(resp => {
      this.geoLatitude = resp.coords.latitude;
      this.geoLongitude = resp.coords.longitude;
      this.geoAccuracy = resp.coords.accuracy;
      console.log(this.geoLatitude, this.geoLongitude);
    })
  }
  


  guardar(){
    var data = {};
    data['url_foto_denuncia'] = this.clickedImagePath;
    data['id_usuario_denuncia'] = localStorage.getItem('idusuario');
    data['identificacion_usuario_denuncia'] = localStorage.getItem('identificacion');
    data['id_categoria'] = this.idtipo;
    data['id_tipo'] = this.denuncia;
    data['detalle_denuncia']= this.detalle_denuncia;
    data['estado_denuncia'] = 'E';
    data['coordenada_x_denuncia'] = this.geoLatitude;
    data['coordenada_y_denuncia'] = this.geoLongitude;
    data['id_usuario_asigna_denuncia'] = 0;
    data['fecha_asigna_denuncia'] = null;
    data['fecha_finaliza_denuncia'] = null;
    data['tipo_for_rest_external_denuncia'] = this.tipo_denuncia;
    data['sesion_denuncia'] = 'S';

    this.api.crearDenuncia(data)
    .then(res => {
      console.log(res);
      this.navCtrl.push('MisSolicitudesPage');
    })    
  }

  
}
