import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController, AlertController, LoadingController } from 'ionic-angular';
let urlApi = "https://www.g-kaipi.cloud/GobiernoAmigoMovil/public/api/";


@Injectable()
export class FavoritosProvider {

  constructor(public http: HttpClient, public toastCtrl: ToastController, public alertCtrl: AlertController, public loadingController: LoadingController) {
    console.log('Hello FavoritosProvider Provider');
  }

  async get_ofertas(){
    const loading = await this.loadingController.create({
      content: 'GobAmigo cargando...'
    });
    await loading.present();
    return new Promise(
      resolve=>{
        this.http.get(urlApi+"get_ofertas")
        .subscribe(
          data  =>{
            loading.dismiss();
            resolve(data);
            // this.proveedores = data;
          },
          err=>{
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

  async get_ofertas_num(){
    return new Promise(
      resolve=>{
        this.http.get(urlApi+"get_ofertas_num")
        .subscribe(
          data  =>{
            resolve(data);
          },
          err=>{
          }
        )
      }
    ); 
  }

  async get_empresas_nuevas(){
    return new Promise(
      resolve=>{
        this.http.get(urlApi+"get_empresas_nuevas")
        .subscribe(
          data  =>{
            resolve(data);
          },
          err=>{
          }
        )
      }
    ); 
  }

  like(data){
    return new Promise(
      resolve=>{
        this.http.post(urlApi+"add_favorito", data)
        .subscribe(
          data  =>{
            resolve(data);
            const toast = this.toastCtrl.create({
              message: 'Se ha añadido a tus favoritos',
              duration: 3000
            });
            toast.present();
          },
          err=>{
            const alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: 'Hubo algún problema, no se agregó a tus favoritos',
              buttons: ['OK']
            }); 
            alert.present();
          }
        )
      }
    );
  }

  dislike(data){
    return new Promise(
      resolve=>{
        this.http.post(urlApi+"remove_favorito", data)
        .subscribe(
          data  =>{
            resolve(data);
            const toast = this.toastCtrl.create({
              message: 'Se ha quitado de tus favoritos',
              duration: 3000
            });
            toast.present();
          },
          err=>{
            const alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: 'Hubo algún problema, no se agregó a tus favoritos',
              buttons: ['OK']
            }); 
            alert.present();
          }
        )
      }
    );
  }

  es_favorito(data){
    return new Promise(
      resolve=>{
        this.http.post(urlApi+"favorito", data)
        .subscribe(
          data  =>{
            resolve(data);
          },
          err=>{
            console.log(err);
            
          }
        )
      }
    );
  }

}
