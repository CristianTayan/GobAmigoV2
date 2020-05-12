import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MdenunciaPage } from './mdenuncia';

import { QRCodeModule } from 'angular2-qrcode';

@NgModule({
  declarations: [
    MdenunciaPage,
  ],
  imports: [
    QRCodeModule,
    IonicPageModule.forChild(MdenunciaPage),
  ],
})
export class MdenunciaPageModule {}
