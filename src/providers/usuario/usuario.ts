import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from 'ionic-angular';

let urlApi = "https://www.g-kaipi.cloud/GobiernoAmigoMovil/public/api/";
// let urlApi = "https://g-kaipi.cloud/GkMarket/public/api/";
@Injectable()
export class UsuarioProvider {
  proveedores;
  proveedores_cercanos;
  constructor(public http: HttpClient, public alertCtrl: AlertController, public loadingController: LoadingController, public toastCtrl: ToastController) {
    console.log('Hello UsuarioProvider Provider');
  }

  get_user_info(correo) {
    return new Promise(resolve => {
      this.http.get(urlApi + 'get_user_info/' + correo)
        .subscribe(
          data => {
            resolve(data);
          },
          err => {
            // alert(err);
          }
        )
    });
  }

  async negocios_mapa(data) {
    const loading = await this.loadingController.create({
      content: 'Cargando negocios cercanos'
    });
    await loading.present();
    return new Promise(
      resolve => {
        this.http.post(urlApi + "negocios_mapa", data)
          .subscribe(
            data => {
              loading.dismiss();
              resolve(data);
            },
            err => {
              loading.dismiss();
            }
          )
      }
    );
  }



  async registro(data) {
    const loading = await this.loadingController.create({
      content: 'GobAmigo cargando ...'
    });
    await loading.present();
    return new Promise(resolve => {
      this.http.post(urlApi + 'registro', data)
        .subscribe(
          data => {
            loading.dismiss();
            resolve(data);
            const alert = this.alertCtrl.create({
              title: 'Registro exitoso',
              subTitle: 'Inicie sesión para continuar',
              buttons: ['OK']
            });
            alert.present();
          },
          err => {
            console.log(err);
            const alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: err.error.message,
              buttons: ['OK']
            });
            alert.present();
            loading.dismiss();
          }
        )
    });
  }

  async login(data) {
    const loading = await this.loadingController.create({
      content: 'GobAmigo cargando ...'
    });
    await loading.present();
    return new Promise(
      resolve => {
        this.http.post(urlApi + "login", data)
          .subscribe(
            data => {
              loading.dismiss();
              resolve(data);
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
        // window.location.reload();
      }
    );
  }

  async mis_favoritos(correo) {
    const loading = await this.loadingController.create({
      content: 'GobAmigo cargando ...'
    });
    await loading.present();
    return new Promise(
      resolve => {
        this.http.get(urlApi + "mis_favoritos/" + correo)
          .subscribe(
            data => {
              loading.dismiss();
              resolve(data);
              this.proveedores = data;
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

  async mis_favorito(correo) {
    return new Promise(
      resolve => {
        this.http.get(urlApi + "mis_favoritos/" + correo)
          .subscribe(
            data => {
              resolve(data);
              this.proveedores = data;
            },
            err => {
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

  verificar_proveedor(data) {
    return new Promise(
      resolve => {
        this.http.post(urlApi + "verificar_proveedor", data)
          .subscribe(
            data => {
              resolve(data);
            },
            err => {

            }
          )
      }
    );
  }

  async actualizar_metodo_pago(data) {
    const loading = await this.loadingController.create({
      content: 'GobAmigo cargando ...'
    });
    await loading.present();
    return new Promise(
      resolve => {
        this.http.post(urlApi + "actualizar_metodo_pago", data)
          .subscribe(
            data => {
              resolve(data);
              loading.dismiss();
              const alert = this.alertCtrl.create({
                title: 'Perfecto',
                subTitle: 'Se ha actualizado con éxito',
                buttons: ['OK']
              });
              alert.present();
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

  async actualizar_empresa(data) {
    const loading = await this.loadingController.create({
      content: 'GobAmigo cargando ...'
    });
    await loading.present();
    return new Promise(
      resolve => {
        this.http.post(urlApi + "actualizar_empresa", data)
          .subscribe(
            data => {
              resolve(data);
              loading.dismiss();
              const alert = this.alertCtrl.create({
                title: 'Perfecto',
                subTitle: 'Su empresa se ha registrado con éxito',
                buttons: ['OK']
              });
              alert.present();
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

  async actualizar_datos_empresa(data) {
    const loading = await this.loadingController.create({
      content: 'GobAmigo cargando ...'
    });
    await loading.present();
    return new Promise(
      resolve => {
        this.http.post(urlApi + "actualizar_datos_empresa", data)
          .subscribe(
            data => {
              resolve(data);
              loading.dismiss();
              const alert = this.alertCtrl.create({
                title: 'Perfecto',
                subTitle: 'La información de su empresa se ha actualizado',
                buttons: ['OK']
              });
              alert.present();
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

  async actualizar_datos_usuario(data) {
    const loading = await this.loadingController.create({
      content: 'GobAmigo cargando ...'
    });
    await loading.present();
    return new Promise(
      resolve => {
        this.http.post(urlApi + "actualizar_datos_usuario", data)
          .subscribe(
            data => {
              resolve(data);
              loading.dismiss();
              const alert = this.alertCtrl.create({
                title: 'Perfecto',
                subTitle: 'Su informacion se ha actualizado',
                buttons: ['OK']
              });
              alert.present();
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

  async update_foto_empresa(data) {
    const loading = await this.loadingController.create({
      content: 'GobAmigo cargando ...'
    });
    await loading.present();
    return new Promise(
      resolve => {
        this.http.post(urlApi + "update_foto_empresa", data)
          .subscribe(
            data => {
              resolve(data);
              loading.dismiss();
              const alert = this.alertCtrl.create({
                title: 'Perfecto',
                subTitle: 'Se ha actualizado la foto de su empresa',
                buttons: ['OK']
              });
              alert.present();
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

  async update_foto_usuario(data) {
    const loading = await this.loadingController.create({
      content: 'GobAmigo cargando ...'
    });
    await loading.present();
    return new Promise(
      resolve => {
        this.http.post(urlApi + "update_foto_usuario", data)
          .subscribe(
            data => {
              resolve(data);
              loading.dismiss();
              const alert = this.alertCtrl.create({
                title: 'Perfecto',
                subTitle: 'Se ha actualizado su foto de perfil',
                buttons: ['OK']
              });
              alert.present();
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

  async get_proveedores_cercanos(data) {
    const loading = await this.loadingController.create({
      content: 'GobAmigo buscando cerca de tí ...',
      duration: 4000
    });
    await loading.present();
    return new Promise(
      resolve => {
        this.http.post(urlApi + "get_proveedores_cercanos", data)
          .subscribe(
            data => {
              loading.dismiss();
              resolve(data);
              this.proveedores_cercanos= data;
            },
            err => {
              console.log(err);

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

  filterProveedoresCercanos(searchTerm) {
    return this.proveedores_cercanos.filter((item) => {
      return item.productos.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  async registrarUsuario(data) {
    const loading = await this.loadingController.create({
      content: 'GobAmigo cargando ...'
    });
    await loading.present();
    return new Promise(
      resolve => {
        this.http.post(urlApi + "registrarUsuario", data)
          .subscribe(
            data => {
              loading.dismiss();
              resolve(data);
              const alert = this.alertCtrl.create({
                title: 'Perfecto',
                subTitle: 'Registro exitoso',
                buttons: ['OK']
              });
              alert.present();
            },
            err => {
              console.log(err);

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

  async registro_oferta(data) {
    const loading = await this.loadingController.create({
      content: 'GobAmigo cargando ...'
    });
    await loading.present();
    return new Promise(resolve => {
      this.http.post(urlApi + 'crear_oferta', data)
        .subscribe(
          data => {
            loading.dismiss();
            resolve(data);
            const alert = this.alertCtrl.create({
              title: 'Perfecto',
              subTitle: 'Se ha registrado tu oferta, ahora estara dsponible para tus clientes',
              buttons: ['OK']
            });
            alert.present();
          },
          err => {
            console.log(err);
            const alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: err.error.message,
              buttons: ['OK']
            });
            alert.present();
            loading.dismiss();
          }
        )
    });
  }

  async mis_ofertas(correo) {
    const loading = await this.loadingController.create({
      content: 'GobAmigo cargando ...'
    });
    await loading.present();
    return new Promise(
      resolve => {
        this.http.get(urlApi + "mis_ofertas/" + correo)
          .subscribe(
            data => {
              loading.dismiss();
              resolve(data);
              // this.proveedores = data;
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

  async editar_oferta(idoferta) {
    const loading = await this.loadingController.create({
      content: 'GobAmigo cargando ...'
    });
    await loading.present();
    return new Promise(
      resolve => {
        this.http.get(urlApi + "editar_oferta/" + idoferta)
          .subscribe(
            data => {
              loading.dismiss();
              resolve(data);
              // this.proveedores = data;
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

  async get_ciudades() {
    const loading = await this.loadingController.create({
      content: 'GobAmigo cargando ...'
    });
    await loading.present();
    return new Promise(resolve => {
      this.http.get(urlApi + 'get_ciudades')
        .subscribe(
          data => {
            loading.dismiss();
            resolve(data);
          },
          err => {
            console.log(err);
            const alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: err.error.message,
              buttons: ['OK']
            });
            alert.present();
            loading.dismiss();
          }
        )
    });
  }

  async actualizar_oferta(idoferta, data) {
    const loading = await this.loadingController.create({
      content: 'GobAmigo cargando ...'
    });
    await loading.present();
    return new Promise(resolve => {
      this.http.put(urlApi + 'actualizar_oferta/' + idoferta, data)
        .subscribe(
          data => {
            loading.dismiss();
            resolve(data);
            const alert = this.alertCtrl.create({
              title: 'Perfecto',
              subTitle: 'Actualizada correctamente',
              buttons: ['OK']
            });
            alert.present();
          },
          err => {
            console.log(err);
            const alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: err.error.message,
              buttons: ['OK']
            });
            alert.present();
            loading.dismiss();
          }
        )
    });
  }

  agregar_visto(data) {
    return new Promise(resolve => {
      this.http.post(urlApi + 'agregar_visto', data)
        .subscribe(
          data => {
            resolve(data);
          },
          err => {
            console.log(err);
          }
        )
    })
  }

  agregar_recomendado(data) {
    return new Promise(resolve => {
      this.http.post(urlApi + 'agregar_recomendado', data)
        .subscribe(
          data => {
            resolve(data);
            const toast = this.toastCtrl.create({
              message: 'Se ha añadido como tu recomendación',
              duration: 3000
            });
            toast.present();
          },
          err => {
            console.log(err);
          }
        )
    })
  }

  es_recomendado(data) {
    return new Promise(resolve => {
      this.http.post(urlApi + 'es_recomendado', data)
        .subscribe(
          data => {
            resolve(data);
          },
          err => {
            console.log(err);
          }
        )
    })
  }

  get_recomendados() {
    return new Promise(resolve => {
      this.http.get(urlApi + 'get_recomendados')
        .subscribe(
          data => {
            resolve(data);
          },
          err => {
            console.log(err);
          }
        )
    })
  }

  get_vistos() {
    return new Promise(resolve => {
      this.http.get(urlApi + 'get_vistos')
        .subscribe(
          data => {
            resolve(data);
          },
          err => {
            console.log(err);
          }
        )
    })
  }

}
