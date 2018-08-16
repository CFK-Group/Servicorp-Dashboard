import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from "./pages/login/login.component"
import { DashboardComponent } from "./pages/dashboard/dashboard.component"
import { ListadoDeUsuariosComponent } from "./pages/listado-de-usuarios/listado-de-usuarios.component"
import { ListadoFormulariosComponent } from "./pages/listado-formularios/listado-formularios.component"
import { CrearUsuarioComponent } from "./pages/crear-usuario/crear-usuario.component"
import { NotFoundComponent } from "./pages/not-found/not-found.component"
import { ChartsComponent } from "./pages/charts/charts.component"
import { ReportesComponent } from "./pages/reportes/reportes.component"
import { ImagenesComponent } from "./pages/imagenes/imagenes.component"

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, children: [
      { path: '', component: ChartsComponent },
      { path: 'usuarios', component: ListadoDeUsuariosComponent },
      { path: 'crear-usuario', component: CrearUsuarioComponent },
      { path: 'reportes', component: ReportesComponent },
      { path: 'imagenes', component: ImagenesComponent },
      { path: ':idUsuario/reportes', component: ListadoFormulariosComponent },
      { path: ':idUsuario/reportes/:categoria', component: ListadoFormulariosComponent },
      { path: '404', component: NotFoundComponent },
      { path: '**', redirectTo: '/dashboard/404' }
    ]
  },
  { path: '**', redirectTo: '/login' }
]

@NgModule({	
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
