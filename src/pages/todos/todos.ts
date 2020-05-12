import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { CategoriasProvider } from '../../providers/categorias/categorias';
import { FavoritosProvider } from '../../providers/favoritos/favoritos';
import { UsuarioProvider } from '../../providers/usuario/usuario';
/**
 * Generated class for the TodosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-todos',
  templateUrl: 'todos.html',
})
export class TodosPage {
  categorias:any;
  contenedor_categorias;

  empresas = [
    {
      nombre:'ABASTOS PANCHITA',
      url: 'assets/imgs/alimentos.jpg',
      cantidad: 3
    },
    {
      nombre:'SUPERMARKET',
      url: 'assets/imgs/alimentos2.jpg',
      cantidad: 5
    },
    {
      nombre:'SU MERCADO',
      url: 'assets/imgs/categoria.jpg',
      cantidad: 3
    },
    {
      nombre:'ABASTOS MARÍA',
      url: 'assets/imgs/categoria2.jpg',
      cantidad: 5
    },
    {
      nombre:'ALIMENTOS',
      url: 'assets/imgs/categoria.jpg',
      cantidad: 3
    },
  ];

  ferreterias = [
    {
      nombre:'HOME REPAIR',
      url: 'assets/imgs/ferre.jpg',
      cantidad: 3
    },
    {
      nombre:'DIY TOOLS',
      url: 'assets/imgs/ferre2.jpg',
      cantidad: 5
    },
    {
      nombre:'SU MERCADO',
      url: 'assets/imgs/categoria.jpg',
      cantidad: 3
    },
    {
      nombre:'ABASTOS MARÍA',
      url: 'assets/imgs/categoria2.jpg',
      cantidad: 5
    },
    {
      nombre:'ALIMENTOS',
      url: 'assets/imgs/categoria.jpg',
      cantidad: 3
    },
  ];

  favoritos;
  recomendados;
  vistos;
  constructor(public navCtrl: NavController, public navParams: NavParams, private statusBar: StatusBar, private categoriasProvider: CategoriasProvider,
    private favoritosProvider: FavoritosProvider, private usuario: UsuarioProvider) {
    
  }

  ionViewDidEnter(){
    this.statusBar.backgroundColorByHexString('#EFEFEF');
    this.statusBar.overlaysWebView(false);
    this.statusBar.styleDefault();
  }

  ionViewDidLoad() {
    this.statusBar.backgroundColorByHexString('#EFEFEF');
    this.statusBar.overlaysWebView(false);
    this.statusBar.styleDefault();
    this.get_favoritos();
    this.get_categorias();
    this.get_recomendados();
    this.get_vistos();
  }
    
  atras(){
    this.navCtrl.pop();
  }

  get_favoritos(){
    var correo = localStorage.getItem('correo');
    this.usuario.mis_favorito(correo)
    .then(res =>{
      this.favoritos = res;
      console.log(this.favoritos);
      
    })
  }

  get_categorias(){
    this.categoriasProvider.getCategorias()
    .then(data => {
      this.categorias = data;  
      console.log(this.categorias);
    })
  }
  get_recomendados(){
    this.usuario.get_recomendados()
    .then(data=>{
      this.recomendados = data;
      console.log(this.recomendados);
      
    })
  }

  get_vistos(){
    this.usuario.get_vistos()
    .then(data=>{
      this.vistos = data;
      console.log(this.vistos);
      
    })
  }

  proveedor(idusuario, correo){
    this.navCtrl.push('ProveedorPage',{
      idusuario: idusuario,
      correo: correo      
    });
  }

  proveedores(idcategoria){
    this.navCtrl.push('BuscaloPage',{
      idcategoria:idcategoria
    });
  }

  ofertas(){
    this.navCtrl.push('OfertasPage');
  }

  servicios(){
    this.navCtrl.push('ServiciosPage');
  }

  incidencias(){
    this.navCtrl.push('RecomendadosPage');
  }

}
