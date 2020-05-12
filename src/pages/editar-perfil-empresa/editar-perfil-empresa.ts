import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { CategoriasProvider } from '../../providers/categorias/categorias';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the EditarPerfilEmpresaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-perfil-empresa',
  templateUrl: 'editar-perfil-empresa.html',
})
export class EditarPerfilEmpresaPage {
  myForm: FormGroup;
  dataUsuario;
  categorias;
  img_empresa;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder, 
              private usuarioProvider:UsuarioProvider, private apiCategoria: CategoriasProvider, private camera: Camera) {
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

  ionViewDidLoad() {
    this.get_categorias();
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

  actualizar_empresa_info(){
    console.log(this.dataUsuario[0]);
    this.usuarioProvider.actualizar_datos_empresa(this.dataUsuario[0])
    .then(data=>{
      this.navCtrl.pop();
    })
    
  }

  asignar_datos(datos){
    for (let item of datos) {
      this.img_empresa = item.img_empresa;      
    }
  }

  get_categorias(){
    this.apiCategoria.getCategorias()
    .then(data =>{
      this.categorias = data;
      console.log(this.categorias);
      
    })
  }

  update_foto_empresa(){
    this.navCtrl.push('UpdateFotoEmpresaPage');
  }

  

}
