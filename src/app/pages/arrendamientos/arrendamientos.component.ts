import { Component, OnInit } from '@angular/core';
import { PropiedadesService } from 'src/app/services/propiedades.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AuthService } from 'src/app/auth/auth.service';
import { MessagesService } from 'src/app/services/messages.service';
import { Observable } from 'rxjs';
import { Propiedades } from 'src/app/models/Propiedades';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Usuarios } from 'src/app/models/Usuarios';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-arrendamientos',
  templateUrl: './arrendamientos.component.html',
  styleUrls: ['./arrendamientos.component.css']
})
export class ArrendamientosComponent implements OnInit {

  faTrashAlt = faTrashAlt

  propiedades$: Observable<Propiedades[]>;
  usuario: Usuarios = new Usuarios();

  constructor(private propiedadesService: PropiedadesService,
    private usuariosService: UsuariosService,
    public auth: AuthService,
    private mensajeService: MessagesService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.auth.userProfile$.subscribe(
      profile => { this.getSingleUsuario(profile.sub);  }
    );
  }

  getSingleUsuario(user_id : string): void {
    this.usuariosService.getSingleUsuario(user_id)
      .subscribe(usuario => {this.usuario = usuario; this.getArrendamientos() });
  }

  getArrendamientos(){
    this.propiedades$ = this.propiedadesService.listarArrendamientos(this.usuario.user_id);
  }

  eliminarArrendamiento(propiedad_alquilada_id: number){
    this.propiedadesService.removePropiedadAlquilada(propiedad_alquilada_id, this.usuario.user_id)
    .subscribe(eliminar => {
      if (eliminar != null) {
        this._snackBar.open("Eliminada!", "X", {
          duration: 5000,
        });
      }
      this.propiedades$ = this.propiedadesService.listarArrendamientos(this.usuario.user_id);
    });
  }

}
