import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//TODO> Importa los componentes aqui.
import { MenuComponent } from './components/menu/menu.component';
import { AgregarUsuarioComponent } from './components/usuarios/agregar-usuario/agregar-usuario.component';
import { EditarUsuarioComponent } from './components/usuarios/editar-usuario/editar-usuario.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

const routes: Routes = [
    { path: '', redirectTo: '/app', pathMatch: 'full' },
    { path: 'app', component: MenuComponent,
      children:[
        
        //CRUD - usuarios
        { path: 'usuarios', component: UsuariosComponent}, 
        { path: 'usuarios/agregar', component: AgregarUsuarioComponent},
        { path: 'usuarios/editar/:id', component: EditarUsuarioComponent}

      ] 
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
