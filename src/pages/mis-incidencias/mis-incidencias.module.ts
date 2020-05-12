import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MisIncidenciasPage } from './mis-incidencias';
import { QRCodeModule } from 'angular2-qrcode';

@NgModule({
  declarations: [
    MisIncidenciasPage,
  ],
  imports: [
    QRCodeModule,
    IonicPageModule.forChild(MisIncidenciasPage),
  ],
})
export class MisIncidenciasPageModule {}
