import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmpresaMapaPage } from './empresa-mapa';

@NgModule({
  declarations: [
    EmpresaMapaPage,
  ],
  imports: [
    IonicPageModule.forChild(EmpresaMapaPage),
  ],
})
export class EmpresaMapaPageModule {}
