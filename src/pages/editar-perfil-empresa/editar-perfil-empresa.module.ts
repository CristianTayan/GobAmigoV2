import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarPerfilEmpresaPage } from './editar-perfil-empresa';

@NgModule({
  declarations: [
    EditarPerfilEmpresaPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarPerfilEmpresaPage),
  ],
})
export class EditarPerfilEmpresaPageModule {}
