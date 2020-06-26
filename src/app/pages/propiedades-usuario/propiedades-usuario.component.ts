import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Propiedades } from 'src/app/models/Propiedades';
import { Usuarios } from 'src/app/models/Usuarios';
import { PropiedadesService } from 'src/app/services/propiedades.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AuthService } from 'src/app/auth/auth.service';
import { MessagesService } from 'src/app/services/messages.service';
import { ParametrosBusquedaPropiedades } from 'src/app/models/ParametrosBusquedaPropiedades';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-propiedades-usuario',
  templateUrl: './propiedades-usuario.component.html',
  styleUrls: ['./propiedades-usuario.component.css']
})
export class PropiedadesUsuarioComponent implements OnInit {

  faTrashAlt = faTrashAlt

  propiedades$: Observable<Propiedades[]>;
  usuario: Usuarios = new Usuarios();

  constructor(private propiedadesService: PropiedadesService,
    private usuariosService: UsuariosService,
    public auth: AuthService,
    private mensajeService: MessagesService) { }

  ngOnInit() {
    this.auth.userProfile$.subscribe(
      profile => { this.getSingleUsuario(profile.sub);  }
    );
  }

  getSingleUsuario(user_id : string): void {
    this.usuariosService.getSingleUsuario(user_id)
      .subscribe(usuario => {this.usuario = usuario; this.getMisPropiedades() });
  }

  getMisPropiedades(){
    var objParams = new ParametrosBusquedaPropiedades()
    objParams.idPropietario = this.usuario.user_id;
    this.propiedades$ = this.propiedadesService.buscarPropiedades(objParams);
  }

}
