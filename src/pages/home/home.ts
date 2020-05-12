import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  MarkerOptions
} from '@ionic-native/google-maps';
import { StatusBar } from '@ionic-native/status-bar';
import { CallNumber } from '@ionic-native/call-number';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { SocialSharing } from '@ionic-native/social-sharing';
import { FavoritosProvider } from '../../providers/favoritos/favoritos';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  geoLongitude: number;
  geoAccuracy: number;
  geoAddress: string;

  watchLocationUpdates: any;
  loading: any;
  isWatching: boolean;

  //Geocoder configuration

  slide_state = " ";
  map: GoogleMap;
  myPosition: any = {};
  markers: any = [];
  user_session;
  foto = localStorage.getItem('foto');
  session;
  es_proveedor;
  correo = localStorage.getItem('correo');
  nro_ofertas: any;
  nro_empresas;
  latitud;
  longitud;

  constructor(public navCtrl: NavController, private geolocation: Geolocation, private statusBar: StatusBar, private callNumber: CallNumber,
    public usuarioProvider: UsuarioProvider, public socialSharing: SocialSharing, private fav: FavoritosProvider, public loadingCtrl:LoadingController
  ) {
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleDefault();

  }
  ionViewDidLoad() {
    this.getCurrentPosition()
  }

  ionViewDidEnter() {
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleDefault();
    this.estaLogueado();
    this.numero_ofertas();
  }

  loadMap(){
    const loader = this.loadingCtrl.create({
      content: "Cargando mapa...",
      duration: 4000
    });
    loader.present();
    let element: HTMLElement = document.getElementById('map');

    this.map = GoogleMaps.create(element);

    let position: CameraPosition<LatLng> = {
      target: new LatLng(this.myPosition.latitude, this.myPosition.longitude),
      zoom: 15,
      tilt: 30
    };

    this.map.one(GoogleMapsEvent.MAP_READY).then(()=>{
      this.map.moveCamera(position);
      let markerOptions: MarkerOptions = {
        position: this.myPosition,
        title: "Ubicación",
        icon: 'assets/imgs/marker.png'
      };
      this.addMarker(markerOptions);
      this.markers.forEach(marker=>{
        this.addMarker(marker);
      });
      
    });
  }

  addMarker(options){
    let markerOptions: MarkerOptions = {
      position: new LatLng(options.position.latitude, options.position.longitude),
      title: options.title,
      snippet: options.categoria,
      icon: {
        url: options.icon,
        size: {
          width: 60,
          height: 60
        }
      },
    };
    this.map.addMarker(markerOptions);
  }

  negocios_mapa() {
    var data = {};
    data['latitud'] = this.latitud;
    data['longitud'] = this.longitud;
    this.usuarioProvider.negocios_mapa(data)
      .then(data => {
        this.markers = data;
        console.log(this.markers);
        this.loadMap();
      })
  }


  getCurrentPosition() {
    const loader = this.loadingCtrl.create({
      content: "Obteniendo tu ubicación...",
      duration: 4000
    });
    loader.present();
    this.geolocation.getCurrentPosition()
      .then(position => {
        this.latitud= position.coords.latitude;
        this.longitud= position.coords.longitude;
        this.myPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
        this.loadMap();
      })
      .catch(error => {
        console.log(error);
      })
  }

  llamar_emergencia() {
    this.callNumber.callNumber("911", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  estaLogueado() {
    this.session = localStorage.getItem('session');
    if (this.session != 'S') {
      this.navCtrl.setRoot('LoginPage');
    }
  }

  numero_ofertas() {
    this.fav.get_ofertas_num()
      .then(data => {
        var nro_ofertas: any = data;
        this.nro_ofertas = nro_ofertas.length;
      })
  }

  numero_empresas_nuevas() {
    this.fav.get_empresas_nuevas()
      .then(data => {
        var nro_empresas: any = data;
        this.nro_empresas = nro_empresas.length;
      })
  }

  whatsappShare() {
    let message: string = 'Gobierno Amigo es una aplicación móvil que facilita la interacción entre la ciudadanía y el gobierno municipal con la finalidad de promover y reactivar la economía y los servicios locales';
    this.socialSharing.shareViaWhatsApp(message, 'https://www.g-kaipi.cloud/GobiernoAmigoMovil/public/images/publicidad.jpg', 'https://www.g-kaipi.cloud');
  }

  Share() {
    let message: string = 'Gobierno Amigo es una aplicación móvil que facilita la interacción entre la ciudadanía y el gobierno municipal con la finalidad de promover y reactivar la economía y los servicios locales';
    let messageH: string = 'Comparte Gobierno Amigo con tus conocidos, cuentales los útil que es';
    this.socialSharing.shareViaFacebookWithPasteMessageHint(message, 'https://www.g-kaipi.cloud/GobiernoAmigoMovil/public/images/publicidad.jpg', 'https://www.g-kaipi.cloud', messageH);
  }



  VerTodos() {
    this.navCtrl.push('TodosPage');
  }

  registrar_empresa(latitud, longitud, correo) {
    this.es_proveedor = localStorage.getItem('es_proveedor');
    if (this.es_proveedor == 'Si') {
      this.navCtrl.push('EmpresaInfoPage', {
        correo: correo
      });
    } else {
      this.navCtrl.push('EmpresaMapaPage', {
        correo: correo,
        latitud: latitud,
        longitud: longitud
      });
    }
  }

  ofertas() {
    this.navCtrl.push('OfertasPage');
  }

  favoritos() {
    this.navCtrl.push('FavoritosPage');
  }

  categorias() {
    this.navCtrl.push('CategoriasPage');
  }

  incidencias() {
    this.navCtrl.push('CategoriaIncidenciaPage')
  }

  servicios() {
    this.navCtrl.push('ServiciosPage');
  }

  perfil() {
    this.navCtrl.push('PerfilPage');
  }

}
