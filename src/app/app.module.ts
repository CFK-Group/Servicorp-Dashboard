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
import { CrearUsuarioComponent } from './pages/crear-usuario/crear-usuario.component'
import { NotFoundComponent } from "./pages/not-found/not-found.component"
import { ApiService } from './providers/api.service'
import { HttpClientModule } from '@angular/common/http'
import { ChartsComponent } from './pages/charts/charts.component'
import { ListadoFormulariosComponent } from './pages/listado-formularios/listado-formularios.component'
import { ReportesComponent } from './pages/reportes/reportes.component'
import { ImagenesComponent } from './pages/imagenes/imagenes.component'
import { RouterModule } from '@angular/router'
import { AppRoutes } from './app-routing.module'
import { Ng2SearchPipeModule } from 'ng2-search-filter'
import { NgxSpinnerModule } from 'ngx-spinner'
import { KonamiModule } from 'ngx-konami'
import es from '@angular/common/locales/es'
import { registerLocaleData } from '@angular/common'
import { LOCALE_ID } from '@angular/core'
registerLocaleData(es)

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent,
    FooterComponent,
    ListadoDeUsuariosComponent,
    CrearUsuarioComponent,
    NotFoundComponent,
    ChartsComponent,
    ListadoFormulariosComponent,
    ReportesComponent,
    ImagenesComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    MaterializeModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    RouterModule.forRoot(AppRoutes, {useHash: true}),
    NgxSpinnerModule,
    KonamiModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "es-ES" },
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
