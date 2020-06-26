import { Component, OnInit } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Propiedades } from 'src/app/models/Propiedades';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PropiedadesService } from 'src/app/services/propiedades.service';
import { MessagesService } from 'src/app/services/messages.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Usuarios } from 'src/app/models/Usuarios';
import { Observable } from 'rxjs';
import { Ciudades } from 'src/app/models/Ciudades';
import { Estados } from 'src/app/models/Estados';
import { UbicacionesService } from 'src/app/services/ubicaciones.service';
import { CrudPropiedades } from 'src/app/models/CrudPropiedades';

@Component({
  selector: 'app-propiedades',
  templateUrl: './propiedades.component.html',
  styleUrls: ['./propiedades.component.css']
})
export class PropiedadesComponent implements OnInit {

  profileJson: string = null;
  usuario: Usuarios = new Usuarios();

  provincias$: Observable<Estados[]>;
  ciudades$: Observable<Ciudades[]>;

  iconEdit = faEdit
  iconRemove = faTrash

  propiedades: Propiedades[]
  propiedad: Propiedades

  displayedColumns: string[] = ['nro', 'nombre', 'surname', 'email'];

  propiedadForm = new FormGroup({
    id: new FormControl(null),
    titulo: new FormControl('', [Validators.required, Validators.minLength(4)]),
    descripcion: new FormControl('', [Validators.required, Validators.minLength(4)]),
    estado: new FormControl('', []),
    idPropietario: new FormControl('', []),
    idCiudad: new FormControl('', [Validators.required])
  });

  constructor(
    private propiedadesService: PropiedadesService,
    private ubicacionesService: UbicacionesService,
    private usuariosService: UsuariosService,
    public auth: AuthService,
    private mensajeService: MessagesService) { }

  ngOnInit(): void {
    this.cargarUbicaciones();
    this.auth.userProfile$.subscribe(
      profile => { this.getSingleUsuario(profile.sub);  }
    );
  }

  cargarUbicaciones(){
    this.provincias$ = this.ubicacionesService.getEstados();
  }

  cargarCiudades(value) {
    value = value == null || value == "" || value == "null" ? +0 : +value;
    this.ciudades$ = this.ubicacionesService.getCiudadesPorEstado(value);
  }

  onClickSavepropiedad(): void {
    this.addpropiedad();
  }

  getSingleUsuario(user_id : string): void {
    this.usuariosService.getSingleUsuario(user_id)
      .subscribe(usuario => {this.usuario = usuario });
  }

  addpropiedad(): void {
    if (this.propiedadForm.valid) {
      let newPerson = new CrudPropiedades();
      newPerson.titulo = this.propiedadForm.get("titulo").value;
      newPerson.descripcion = this.propiedadForm.get("descripcion").value;
      newPerson.estado = "ACTIVO";
      newPerson.idPropietario = this.usuario.user_id;
      newPerson.idCiudad = this.propiedadForm.get("idCiudad").value;

      this.propiedadesService.addPropiedad(newPerson)
          .subscribe(propiedad => { this.propiedad = propiedad; });
      
      this.propiedadForm.reset();
    }
  }
}
