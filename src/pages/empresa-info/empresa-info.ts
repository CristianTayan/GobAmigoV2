import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { StatusBar } from '@ionic-native/status-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriasProvider } from '../../providers/categorias/categorias';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import { HomePage } from '../home/home';

/**
 * Generated class for the EmpresaInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-empresa-info',
  templateUrl: 'empresa-info.html',
})
export class EmpresaInfoPage {
  myForm: FormGroup;
  myForm2: FormGroup;
  coordenadax = this.navParams.get('latitud');
  coordenaday = this.navParams.get('longitud');
  identificacion = localStorage.getItem('identificacion');
  nombre_negocio;
  slogan;
  productos;
  idcategoria;
  img_empresa;
  idciudad;
  correo = localStorage.getItem('correo');
  categorias;
  geoAccuracy: number;
  geoAddress: string;

  watchLocationUpdates: any;
  loading: any;
  isWatching: boolean;
  info_empresa;
  es_proveedor = localStorage.getItem('es_proveedor');
  item;
  dias_atencion;
  hora_apertura;
  hora_cierre;
  a_domicilio;
  ciudades;

  //Geocoder configuration
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  constructor(public navCtrl: NavController,public fb: FormBuilder, private apiCategoria: CategoriasProvider, private nativeGeocoder: NativeGeocoder,
    public navParams: NavParams, public camera: Camera, private statusBar: StatusBar, private usuarioProvider: UsuarioProvider) {
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleDefault();

    this.myForm= this.fb.group({
      identificacion: ['',Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(13)])],
      geoAddress: ['',Validators.compose([Validators.required])],
      nombre_negocio: ['',Validators.compose([Validators.required])],
      slogan: ['',Validators.compose([Validators.required])],
      productos: ['',Validators.compose([Validators.required])],
      idcategoria: ['',Validators.compose([Validators.required])],
      idciudad: ['',Validators.compose([Validators.required])],
      correo: ['',Validators.compose([Validators.required])],
      dias_atencion: ['',Validators.compose([])],
      hora_apertura: ['',Validators.compose([])],
      hora_cierre: ['',Validators.compose([])],
      a_domicilio: ['',Validators.compose([])]
    })
  }

  
  ionViewDidEnter(){
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleDefault();
  }


  ionViewDidLoad() {
    this.idciudad = localStorage.getItem('idciudad');

    console.log(this.coordenadax, this.coordenaday);
    this. getGeoencoder(this.coordenadax, this.coordenaday);
    this.get_categorias();  
    this.get_user_info();  
    this.get_ciudades();
  }

  get_categorias(){
    this.apiCategoria.getCategorias()
    .then(data =>{
      this.categorias = data;
      console.log(this.categorias);
      
    })
  }

  get_user_info(){
    this.usuarioProvider.get_user_info(localStorage.getItem('correo'))
    .then(res => {
      this.info_empresa = res;
      for(let item of this.info_empresa){
        this.coordenadax = parseFloat(item.coordenadax);
        this.coordenaday = parseFloat(item.coordenaday);
        this.getGeoencoder(this.coordenadax, this.coordenaday);
        
      }
    })
  }

  actualizar_empresa(){
    var data = this.info_empresa;
    console.log(data);
    this.usuarioProvider.actualizar_empresa(data)
    .then(data =>{
      localStorage.setItem('img_empresa', this.img_empresa);  
      this.navCtrl.setRoot(HomePage); 
    })
    
  }

  crear_empresa(){
    var data = {};
    data['identificacion'] = this.identificacion;
    data['coordenadax'] = this.navParams.get('latitud');
    data['coordenaday'] = this.navParams.get('longitud');;
    data['nombre_negocio']=this.nombre_negocio;
    data['correo'] = this.correo;
    data['slogan'] = this.slogan;
    data['productos'] = this.productos;
    data['idcategoria'] = this.idcategoria;
    data['idciudad'] = this.idciudad;
    data['img_empresa'] = this.img_empresa;
    data['identificacion'] = this.identificacion;
    data['dias_atencion'] = this.dias_atencion;
    data['hora_apertura'] = this.hora_apertura;
    data['hora_cierre'] = this.hora_cierre;
    data['a_domicilio'] = this.a_domicilio;
    
    this.usuarioProvider.actualizar_empresa(data)
    .then(data =>{
      localStorage.setItem('img_empresa', this.img_empresa);  
      this.navCtrl.setRoot(HomePage); 
    })
    
  }

  get_ciudades(){
    this.usuarioProvider.get_ciudades()
    .then(data =>{
      this.ciudades = data;
    })

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

  getGeoencoder(latitude, longitude) {
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
      .then((result: NativeGeocoderReverseResult[]) => {
        console.log(result[0]);
        
        var ciudad = result[0].locality;
        var calle = result[0].thoroughfare;
        var provincia = result[0].administrativeArea;
        var pais = result[0].countryCode;
        var direccion = "Calle: "+ calle+', '+ ciudad+', '+provincia+', '+pais;
        this.geoAddress = direccion;
      })
      .catch((error: any) => {
        // alert('Error getting location' + JSON.stringify(error));
      });
  }

  pasar_datos(latitud, longitud) {
    this.navCtrl.push('EmpresaInfoPage', {
      latitud: latitud,
      longitud: longitud
    })
  }

  //Return Comma saperated address
  generateAddress(addressObj) {
    let obj = [];
    let address = "";
    for (let key in addressObj) {
      obj.push(addressObj[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if (obj[val].length)
        address += obj[val] + ', ';
    }
    return address.slice(0, -2);
  }

}
