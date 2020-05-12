import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarOfertaPage } from './editar-oferta';

@NgModule({
  declarations: [
    EditarOfertaPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarOfertaPage),
  ],
})
export class EditarOfertaPageModule {}
