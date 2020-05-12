import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecomendadosPage } from './recomendados';

@NgModule({
  declarations: [
    RecomendadosPage,
  ],
  imports: [
    IonicPageModule.forChild(RecomendadosPage),
  ],
})
export class RecomendadosPageModule {}
