import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

/**
 * Generated class for the SobreGobAmigoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sobre-gob-amigo',
  templateUrl: 'sobre-gob-amigo.html',
})
export class SobreGobAmigoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private statusBar: StatusBar) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SobreGobAmigoPage');
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleLightContent();
  }

}
