import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CrearOfertaPage } from './crear-oferta';

@NgModule({
  declarations: [
    CrearOfertaPage,
  ],
  imports: [
    IonicPageModule.forChild(CrearOfertaPage),
  ],
})
export class CrearOfertaPageModule {}
