import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatusBar } from '@ionic-native/status-bar';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { HomePage } from '../home/home';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

// import { GooglePlus } from '@ionic-native/google-plus';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user;
  correo;
  acceso;
  myForm: FormGroup;
  userData;
  isLoading = false;
  constructor(public navCtrl: NavController, public fb: FormBuilder, public navParams: NavParams, private loadingController: LoadingController,
    private statusBar: StatusBar, private fab: Facebook, private userService: UsuarioProvider, public events: Events) {
    this.myForm = this.fb.group({
      correo: ['', Validators.compose([Validators.required, Validators.email])],
      acceso: ['', Validators.compose([Validators.required])]
    });
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleDefault();


  }


  ionViewDidEnter() {
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleDefault();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  facebookLogin() {
    this.fab.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
      .catch(e => console.log('Error logging into Facebook', e));
  }

  async login() {
    var data = {};
    data['correo'] = this.correo;
    data['acceso'] = this.acceso;

    this.userService.login(data)
      .then(data => {
        this.userData = data;
        this.createUser(this.userData);
        this.guardar_storage(this.userData);
        localStorage.setItem('session', 'S');
        this.navCtrl.setRoot(HomePage);
      })
  }

  createUser(user) {
    this.events.publish('user:signedIn',
      this.user =
      localStorage.setItem('userStorage', JSON.stringify(user))
    );

  }


  registro() {
    this.navCtrl.push('RegistroPage')
  }

  guardar_storage(data) {
    for (let item of data) {
      localStorage.setItem('nombre', item.nombre);
      localStorage.setItem('correo', item.correo);
      localStorage.setItem('idusuario', item.idusuario);
      localStorage.setItem('foto', item.foto);
      localStorage.setItem('movil', item.movil);
      localStorage.setItem('proveedor', item.proveedor);
    }
  }

}
