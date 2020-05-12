import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarPerfilUsuarioPage } from './editar-perfil-usuario';

@NgModule({
  declarations: [
    EditarPerfilUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarPerfilUsuarioPage),
  ],
})
export class EditarPerfilUsuarioPageModule {}
