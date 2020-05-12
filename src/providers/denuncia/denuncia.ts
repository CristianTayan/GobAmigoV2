import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { ToastController, LoadingController, AlertController } from 'ionic-angular';
/*
  Generated class for the DenunciaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let urlApi = "https://www.g-kaipi.cloud/GobiernoAmigoMovil/public/api/"
@Injectable()
export class DenunciaProvider {

  constructor(public http: HttpClient,private alertCtrl: AlertController, public toastCtrl: ToastController, private loadingController: LoadingController) {
    console.log('Hello DenunciaProvider Provider');
  }

  async crearDenuncia(data) {
    const loading = await this.loadingController.create({
      content: 'GobAmigo cargando...'
    });
    await loading.present();
    return new Promise(
      resolve => {
        this.http.post(urlApi + "update", data)
          .subscribe(
            data => {
              resolve(data);
              const alert = this.alertCtrl.create({
                title: 'Perfecto',
                subTitle: "Tu incidencia se ha enviado",
                buttons: ['OK']
              }); 
              alert.present();
              loading.dismiss();
            },
            err => {
              const alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: err.error.message,
                buttons: ['OK']
              }); 
              alert.present();
              loading.dismiss();
            }
          )
      }
    );
  }

  async getDenuncia(data) {
    const loading = await this.loadingController.create({
      content: 'GobAmigo cargando...'
    });
    await loading.present();
    return new Promise(
      resolve => {
        this.http.post(urlApi + "getDenuncia", data)
          .subscribe(
            data => {
              resolve(data);
              loading.dismiss();
            },
            err => {
              const toast = this.toastCtrl.create({
                message: err.error.message,
                duration: 3000
              });
              toast.present();
              loading.dismiss();
            }
          )
      }
    );
  }


  async getDenuncias(data) {
    const loading = await this.loadingController.create({
      content: 'GobAmigo cargando...'
    });
    await loading.present();
    return new Promise(
      resolve => {
        this.http.post(urlApi + "getDenuncias", data)
          .subscribe(
            data => {
              resolve(data);
              loading.dismiss();
            }, err => {
              const alert = this.alertCtrl.create({
                title: '',
                subTitle: 'No tiene incidencias registradas',
                buttons: ['OK']
              }); 
              alert.present();
              loading.dismiss();
            }
          )
      }
    );
  }
  async getCategorias() {
    const loading = await this.loadingController.create({
      content: 'GobAmigo cargando...'
    });
    await loading.present();
    return new Promise(resolve => {
      this.http.get(urlApi+'api/getCategorias').subscribe(data => {
        resolve(data);
        loading.dismiss();
      }, err => {
        const alert = this.alertCtrl.create({
          title: '',
          subTitle: err.error.message,
          buttons: ['OK']
        }); 
        alert.present();
        loading.dismiss();
      });
    });
  }

  async getCategoriaById(id){
    const loading = await this.loadingController.create({
      content: 'GobAmigo cargando...'
    });
    await loading.present();
    return new Promise(
      resolve => {
        this.http.get(urlApi+'getCategoria/'+id)
        .subscribe(data =>{
          resolve(data);
          loading.dismiss();
        })
      }
    )
  }

}
