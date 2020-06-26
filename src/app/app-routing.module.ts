import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { PersonsComponent } from './pages/persons/persons.component';
import { UbicacionesComponent } from './pages/ubicaciones/ubicaciones.component';
import { PropiedadesComponent } from './pages/propiedades/propiedades.component';
import { ListarPropiedadesComponent } from './pages/listar-propiedades/listar-propiedades.component';
import { ArrendamientosComponent } from './pages/arrendamientos/arrendamientos.component';
import { PropiedadesUsuarioComponent } from './pages/propiedades-usuario/propiedades-usuario.component';
import { ReportesPropiedadesComponent } from './pages/reportes-propiedades/reportes-propiedades.component';

const routes: Routes = [
  {
    path: 'person',
    component: PersonsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ubicaciones',
    component: UbicacionesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'propiedades',
    component: PropiedadesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'listar-propiedades',
    component: ListarPropiedadesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'mis-propiedades',
    component: PropiedadesUsuarioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'mis-arrendamientos',
    component: ArrendamientosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reporteria',
    component: ReportesPropiedadesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
