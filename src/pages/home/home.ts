import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  GoogleMapOptions,
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
    public usuarioProvider: UsuarioProvider, public socialSharing: SocialSharing, private fav: FavoritosProvider, public loadingCtrl: LoadingController
  ) {
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleDefault();

  }
  ionViewDidLoad() {
    this.loadMap();
    this.numero_ofertas();
    this.numero_empresas_nuevas();
  }

  ionViewDidEnter() {
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleDefault();
    this.estaLogueado();
    // this.numero_ofertas();
  }

  loadMap() {
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904, // default location
          lng: -89.3809802 // default location
        },
        zoom: 16,
        tilt: 30
      }
    };
    this.map = GoogleMaps.create("map", mapOptions);

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.getPosition();
    });

  }
  getPosition(): void {
    this.map.getMyLocation()
      .then(response => {
        this.latitud = response.latLng.lat;
        this.longitud = response.latLng.lng;
        this.map.moveCamera({
          target: response.latLng
        });
        this.map.addMarker({
          title: 'My Position',
          icon: 'blue',
          animation: 'DROP',
          position: response.latLng
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  negocios_mapa() {
    var data = {};
    data['latitud'] = this.latitud;
    data['longitud'] = this.longitud;
    this.usuarioProvider.negocios_mapa(data)
      .then(data => {
        this.markers = data;
        console.log(this.markers);

        let markerOptions: MarkerOptions = {
          position: this.myPosition,
          title: "Hola",
          icon: 'www/assets/imgs/marker-pink.png'
        };

        this.addMarker(markerOptions);

        this.markers.forEach(marker => {
          this.addMarker(marker);
        });
      })

  }

  addMarker(options) {
    let markerOptions: MarkerOptions = {
      position: new LatLng(options.position.latitude, options.position.longitude),
      title: options.title,
      snippet: options.categoria,
      icon: {
        url: options.icon,
        size: {
          width: 70,
          height: 70
        }
      },
    };
    this.map.addMarker(markerOptions);
  }


  llamar_emergencia() {
    this.callNumber.callNumber("911", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  llamar_emergencia2() {
    this.callNumber.callNumber("171", true)
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
