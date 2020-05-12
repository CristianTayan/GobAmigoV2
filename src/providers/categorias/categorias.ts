import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from 'ionic-angular';

let urlApi = "https://www.g-kaipi.cloud/GobiernoAmigoMovil/public/api/"

@Injectable()
export class CategoriasProvider {
  categorias;
  proveedores;
  constructor(public http: HttpClient, private alertCtrl: AlertController,private loadingController: LoadingController) {
    console.log('Hello CategoriasProvider Provider');
  }

  async getCategorias() {
    const loading = await this.loadingController.create({
      content: 'GobAmigo cargando...'
    });
    await loading.present();
    return new Promise(resolve => {
      this.http.get(urlApi+'categorias').subscribe(data => {
        resolve(data);
        this.categorias = data;
        loading.dismiss();
      }, err => {
        const alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: err.error.message,
          buttons: ['OK']
        }); 
        alert.present();
        loading.dismiss();
      });
    });
  }

  filterItems(searchTerm) {
    return this.categorias.filter((item) => {    
      return item.nombre_categoria.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  async get_user_info(correo){
    const loading = await this.loadingController.create({
      content: 'GobAmigo cargando...'
    });
    await loading.present();
    return new Promise(
      resolve => {
        this.http.get(urlApi+"get_user_info/"+ correo)
        .subscribe(
          data  =>{
            resolve(data);
            this.proveedores = data;
            loading.dismiss();
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

  async getProveedores(idcategoria){
    const loading = await this.loadingController.create({
      content: 'GobAmigo cargando...'
    });
    await loading.present();
    return new Promise(
      resolve => {
        this.http.get(urlApi+"proveedores/buscar/"+idcategoria)
        .subscribe(
          data  =>{
            resolve(data);
            this.proveedores = data;
            loading.dismiss();
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
  

  filterProveedores(searchTerm) {
    return this.proveedores.filter((item) => {    
      return item.nombre_negocio.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

}
