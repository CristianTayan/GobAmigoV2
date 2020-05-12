import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuscaloPage } from './buscalo';

@NgModule({
  declarations: [
    BuscaloPage,
  ],
  imports: [
    IonicPageModule.forChild(BuscaloPage),
  ],
})
export class BuscaloPageModule {}
