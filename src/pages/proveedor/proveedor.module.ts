import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProveedorPage } from './proveedor';

@NgModule({
  declarations: [
    ProveedorPage,
  ],
  imports: [
    IonicPageModule.forChild(ProveedorPage),
  ],
})
export class ProveedorPageModule {}
