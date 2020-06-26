import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PropiedadesService } from 'src/app/services/propiedades.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AuthService } from 'src/app/auth/auth.service';
import { MessagesService } from 'src/app/services/messages.service';
import { Observable } from 'rxjs';
import { Propiedades } from 'src/app/models/Propiedades';
import { switchMap } from 'rxjs/operators';
import { ParametrosBusquedaPropiedades } from 'src/app/models/ParametrosBusquedaPropiedades';
import { faSearch, faTruckLoading } from '@fortawesome/free-solid-svg-icons';
import { AlquilarPropiedad } from 'src/app/models/AlquilarPropiedad';
import { Usuarios } from 'src/app/models/Usuarios';
import { Ciudades } from 'src/app/models/Ciudades';
import { Estados } from 'src/app/models/Estados';
import { UbicacionesService } from 'src/app/services/ubicaciones.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listar-propiedades',
  templateUrl: './listar-propiedades.component.html',
  styleUrls: ['./listar-propiedades.component.css']
})
export class ListarPropiedadesComponent implements OnInit {

  faSearch = faSearch;
  faTruckLoading = faTruckLoading;

  propiedades$: Observable<Propiedades[]>;

  usuario: Usuarios = new Usuarios();

  constructor(private route: ActivatedRoute,
    private propiedadesService: PropiedadesService,
    private usuariosService: UsuariosService,
    public auth: AuthService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    var objParams = new ParametrosBusquedaPropiedades()
    this.propiedades$ = this.route.paramMap.pipe(
      switchMap(params => {
        objParams.titulo = params.get("textoBusqueda")
        return this.propiedadesService.buscarPropiedades(objParams);
      })
    );
    this.auth.userProfile$.subscribe(
      profile => { this.getSingleUsuario(profile.sub);  }
    );
  }

  getSingleUsuario(user_id : string): void {
    this.usuariosService.getSingleUsuario(user_id)
      .subscribe(usuario => { this.usuario = usuario });
  }

  buscarPorFiltro(titulo, descripcion, ciudad) {
    let objParams = new ParametrosBusquedaPropiedades()
    objParams.titulo = titulo != null && titulo != "" ? titulo : null;
    objParams.descripcion = descripcion != null && descripcion != "" ? descripcion : null;
    objParams.ciudad = ciudad != null && ciudad != "" ? ciudad : null;
    this.propiedades$ = this.propiedadesService.buscarPropiedades(objParams);
  }

  alquilarPropiedad(propiedad_id){
    let alquilarPropiedad = new AlquilarPropiedad()
    alquilarPropiedad.arrendador_id = this.usuario.user_id
    alquilarPropiedad.propiedad_id = propiedad_id
    this.propiedadesService.alquilarPropiedad(alquilarPropiedad)
    .subscribe(res => { 
      if (res != null){
        this._snackBar.open("Alquilada!", "X", {
          duration: 5000,
        });
      }
    });
  }

}
