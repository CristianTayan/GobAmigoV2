import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UsuarioProvider } from '../../providers/usuario/usuario';

/**
 * Generated class for the EditarPerfilUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-perfil-usuario',
  templateUrl: 'editar-perfil-usuario.html',
})
export class EditarPerfilUsuarioPage {
  myForm: FormGroup;
  // img_empresa;
  dataUsuario;
  foto;
  nombre;
  user;

  constructor(public navCtrl: NavController, public fb: FormBuilder, public navParams: NavParams, public usuarioProvider: UsuarioProvider,public events: Events) {
    this.myForm= this.fb.group({
      nombre: ['',Validators.compose([Validators.required])],
      correo: ['', Validators.compose([Validators.required, Validators.email])],
      identificacion: ['',Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(13)])],
      movil: ['',Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      proveedor: ['',Validators.compose([Validators.required])],
      // acceso: ['',Validators.compose([Validators.required, Validators.minLength(8)])]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarPerfilUsuarioPage');
    this.get_empresa_info();
  }

  get_empresa_info(){
    var correo = localStorage.getItem('correo');
    this.usuarioProvider.get_user_info(correo)
    .then(data =>{
      this.dataUsuario = data;
      console.log(this.dataUsuario);
      this.asignar_datos(this.dataUsuario);
      // this.asignar_datos_a_variables(this.dataUsuario)
    })
  }

  asignar_datos(datos){
    for (let item of datos) {
      this.foto = item.foto;
      this.nombre = item.nombre;
    }
  }

  update_user_info(){
    
    this.usuarioProvider.actualizar_datos_usuario(this.dataUsuario[0])
    .then(data=>{
      for (let item of this.dataUsuario) {
        localStorage.setItem('nombre', item.nombre);
        this.createUser(item.nombre);
      }
      this.navCtrl.pop();
    })
    
  }

  createUser(dato) {
    this.events.publish('nombre:signedIn',
      this.user =
      localStorage.setItem('nombre', dato)
    );
  }

  update_foto_usuario(){
    this.navCtrl.push('UpdateFotoUsuarioPage');
  }

}
