import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DenunciaProvider } from '../../providers/denuncia/denuncia';
import { GoogleMapOptions, GoogleMap, GoogleMaps, GoogleMapsEvent } from '@ionic-native/google-maps';
import { PhotoViewer } from '@ionic-native/photo-viewer';

/**
 * Generated class for the MdenunciaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mdenuncia',
  templateUrl: 'mdenuncia.html',
})
export class MdenunciaPage {

  denuncias;
  coordenada_x_denuncia = this.navParams.get('coordenada_x_denuncia');
  coordenada_y_denuncia = this.navParams.get('coordenada_y_denuncia');
  map: GoogleMap;

  constructor(public navCtrl: NavController, public navParams: NavParams, public denuncia: DenunciaProvider, private photoViewer: PhotoViewer) {
  }

  ionViewDidLoad() {
    this.getDenuncia();
    this.loadMap();

  }

  getDenuncia() {
    var data = {};
    data['id_denuncia'] = this.navParams.get('id_denuncia');
    this.denuncia.getDenuncia(data)
      .then(res => {
        this.denuncias = res;
        console.log(this.denuncias);
        
      })
  }

  loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.navParams.get('coordenada_x_denuncia'),
          lng: this.navParams.get('coordenada_y_denuncia')
        },
        zoom: 16,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        this.getPosition();
      })
      .catch(error => {
        console.log(error);
      });
  }
  getPosition(): void {
    this.map.getMyLocation()
      .then(response => {
        this.map.moveCamera({
          target: response.latLng
        });
        this.map.addMarker({
          title: 'Punto de incidencia',
          icon: 'blue',
          animation: 'DROP',
          position: response.latLng
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  viewImage(url_foto_denuncia){
    this.photoViewer.show('https://www.g-kaipi.cloud/GobiernoAmigoMovil/public'+url_foto_denuncia, 'Deseas compartir la imagen en otros medios?', {share: true});
  }
  

}
