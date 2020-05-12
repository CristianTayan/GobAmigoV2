import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions
} from '@ionic-native/google-maps';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';


declare var google;

@IonicPage()
@Component({
  selector: 'page-empresa-mapa',
  templateUrl: 'empresa-mapa.html',
})
export class EmpresaMapaPage {
  // @ViewChild('map') mapElement: ElementRef;
  // map: any;
  map: GoogleMap;
  myPosition;
  latitud;
  longitud;
  geoAccuracy: number;
  geoAddress: string;

  watchLocationUpdates: any;
  loading: any;
  isWatching: boolean;
  lat;
  lng;

  //Geocoder configuration
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  constructor(public navCtrl: NavController, private googleMaps: GoogleMaps, public navParams: NavParams, private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder,
    private statusBar: StatusBar, public alertCtrl: AlertController) {
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleDefault();
  }
  ionViewDidEnter() {
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleDefault();

  }

  ionViewDidLoad() {
    // this.getCurrentPosition();
    // console.log(this.lat, this.lng);

    console.log(this.geoAddress);
    this.loadMap();
  }



  loadMap() {
    
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 0.3575681, // default location
          lng: -78.0994204// default location
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('mapa', mapOptions);
    this.getLocation();

    // this.map.addMarker({
    //   title: 'Tu empresa',
    //   icon: 'red',
    //   animation: 'DROP',
    //   zoom: 18,
    //   position: {
    //     lat: this.lat,
    //     lng: this.lng
    //   }
    // });
    let coords;
    this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe((e) => {
      this.map.setOptions(mapOptions);
      coords = e[0];
      this.latitud = coords.lat;
      this.longitud = coords.lng;

      this.map.moveCamera({
        target: { lat: this.latitud, lng: this.longitud }
      });

      this.map.addMarker({
        title: 'Tu empresa',
        icon: 'blue',
        animation: 'DROP',
        zoom: 18,
        position: {
          lat: this.latitud,
          lng: this.longitud
        }
      });

      this.getGeoencoder(this.latitud, this.longitud)

    });
  }

  getLocation() {
    this.map.getMyLocation()
      .then(response => {
        this.map.moveCamera({
          target: response.latLng
        });

        this.latitud = response.latLng.lat;
        this.longitud = response.latLng.lng;
        console.log(this.latitud, this.longitud);
        
        this.map.addMarker({
          title: 'Mi ubicación',
          icon: 'red',
          animation: 'DROP',
          zoom: 18,
          position: response.latLng
        });
        // this.getGeoencoder(this.latitud, this.longitud);
      })
      .catch(error => {
        console.log(error);
      });
  }

  markerUbicacion() {
    this.map.setOptions;
    let coords;
    this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe((e) => {
      coords = e[0];
      this.latitud = coords.lat;
      this.longitud = coords.lng;
      this.map.moveCamera({
        target: { lat: this.latitud, lng: this.longitud }
      });

      this.map.addMarker({
        title: 'Tu empresa',
        icon: 'blue',
        animation: 'DROP',
        zoom: 18,
        position: {
          lat: this.latitud,
          lng: this.longitud
        }
      });
      // this.watchLocation();
      // this.getGeoencoder(this.latitud, this.longitud);
    })
  }


  getGeoencoder(latitude, longitude) {
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
      .then((result: NativeGeocoderReverseResult[]) => {
        var ciudad = result[0].locality;
        var calle = result[0].thoroughfare;
        var provincia = result[0].administrativeArea;
        var pais = result[0].countryCode;
        var direccion = "Calle: "+ calle+', '+ ciudad+', '+provincia+', '+pais;
        this.geoAddress = direccion;
        const confirm = this.alertCtrl.create({
          title: 'Está aqui tu empresa?',
          message: this.geoAddress,
          buttons: [
            {
              text: 'Cancelar',
              handler: () => {
                this.loadMap();
              }
            },
            {
              text: 'sí, continuar',
              handler: () => {
                this.pasar_datos(this.latitud, this.longitud);
              }
            }
          ]
        });
        confirm.present();
      })
      .catch((error: any) => {
        alert('Error getting location' + JSON.stringify(error));
      });
  }

  pasar_datos(latitud, longitud) {
    this.navCtrl.push('EmpresaInfoPage', {
      latitud: latitud,
      longitud: longitud
    })
  }

}
