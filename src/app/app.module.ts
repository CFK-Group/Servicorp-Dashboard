import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppComponent } from './app.component'
import { MaterializeModule } from 'angular2-materialize'
import { NavbarComponent } from './components/navbar/navbar.component'
import { LoginComponent } from './pages/login/login.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { FooterComponent } from './components/footer/footer.component'
import { ListadoDeUsuariosComponent } from './pages/listado-de-usuarios/listado-de-usuarios.component'
import { AppRoutingModule } from './app-routing.module'
import { CrearUsuarioComponent } from './pages/crear-usuario/crear-usuario.component'
import { NotFoundComponent } from "./pages/not-found/not-found.component"

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent,
    FooterComponent,
    ListadoDeUsuariosComponent,
    CrearUsuarioComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
