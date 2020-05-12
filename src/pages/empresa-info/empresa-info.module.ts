import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmpresaInfoPage } from './empresa-info';

@NgModule({
  declarations: [
    EmpresaInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(EmpresaInfoPage),
  ],
})
export class EmpresaInfoPageModule {}
