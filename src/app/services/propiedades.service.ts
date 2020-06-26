import { Injectable } from '@angular/core';
import { MessagesService } from './messages.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Propiedades } from '../models/Propiedades';
import { catchError, tap } from 'rxjs/operators';
import { ParametrosBusquedaPropiedades } from '../models/ParametrosBusquedaPropiedades';
import { AlquilarPropiedad } from '../models/AlquilarPropiedad';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PropiedadesAlquiladas } from '../models/PropiedadesAlquiladas';
import { CrudPropiedades } from '../models/CrudPropiedades';

@Injectable({
  providedIn: 'root'
})
export class PropiedadesService {

  private baseUrl = 'http://localhost:8080/propiedades';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(
    private http: HttpClient,
    private mensajes: MessagesService,
    private _snackBar: MatSnackBar
  ) { }

  /** GET Propiedad by id. Will 404 if id not found */
  getPropiedades(): Observable<Propiedades[]> {
    return this.http.get<Propiedades[]>(this.baseUrl)
      .pipe(
        //tap(_ => this.log('Propiedades obtenidas')),
        catchError(this.handleError<Propiedades[]>('getPropiedades', []))
      );
  }

  buscarPropiedades(params: ParametrosBusquedaPropiedades): Observable<Propiedades[]> {
    return this.http.post<Propiedades[]>(this.baseUrl + "/ListarPropiedadesPorParametros", params)
      .pipe(
        //tap(_ => this.log('Propiedades obtenidas')),
        catchError(this.handleError<Propiedades[]>('getPropiedades', []))
      );
  }

  listarArrendamientos(user_id: string): Observable<Propiedades[]> {
    return this.http.get<Propiedades[]>(this.baseUrl + "/ListarPropiedadesPorUsuario/" + user_id)
      .pipe(
        //tap(_ => this.log('Propiedades obtenidas')),
        catchError(this.handleError<Propiedades[]>('getPropiedades', []))
      );
  }

  /** GET Propiedad by id. Will 404 if id not found */
  alquilarPropiedad(alquilar: AlquilarPropiedad): Observable<AlquilarPropiedad> {
    return this.http.post<AlquilarPropiedad>(this.baseUrl + "/alquilarPropiedad", alquilar, this.httpOptions).pipe(
      tap((newPropiedad: AlquilarPropiedad) => this.log(`added AlquilarPropiedad w/ id=${newPropiedad.id}`)),
      catchError(this.handleError<AlquilarPropiedad>('addAlquilarPropiedad'))
    );
  }

  /** GET Propiedad by id. Will 404 if id not found */
  addPropiedad(propiedad: CrudPropiedades): Observable<Propiedades> {
    return this.http.post<Propiedades>(this.baseUrl, propiedad, this.httpOptions).pipe(
      tap((newPropiedad: Propiedades) => this.log(`added propiedad w/ id=${newPropiedad.id}`)),
      catchError(this.handleError<Propiedades>('addPropiedad'))
    );
  }

  /** GET Propiedad by id. Will 404 if id not found */
  editPropiedad(id: number, propiedad: Propiedades): Observable<Propiedades> {

    return this.http.post<Propiedades>(this.baseUrl + "/update/" + id, propiedad, this.httpOptions).pipe(
      tap((newPropiedad: Propiedades) => this.log(`updated propiedad w/ id=${newPropiedad.id}`)),
      catchError(this.handleError<Propiedades>('editPropiedad'))
    );
  }

  /** GET Propiedad by id. Will 404 if id not found */
  removePropiedad(id: number): Observable<Propiedades> {

    return this.http.post<Propiedades>(this.baseUrl + "/delete/" + id, null, this.httpOptions).pipe(
      tap(() => this.log(`removed propiedad w/ id=${id}`)),
      catchError(this.handleError<Propiedades>('removePropiedad'))
    );
  }

  removePropiedadAlquilada(id: number, user_id: string): Observable<PropiedadesAlquiladas> {

    return this.http.post<PropiedadesAlquiladas>(this.baseUrl + "/deletePropiedadAlquilada/" + id + "/" + user_id, null, this.httpOptions).pipe(
      tap(() => this.log(`removed propiedad w/ id=${id}`)),
      catchError(this.handleError<PropiedadesAlquiladas>('removePropiedad'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      try {
        
        this._snackBar.open(error.error.error, "X", {
          duration: 5000,
        });

      } catch (error) {
        this._snackBar.open("Error desconocido", "X", {
          duration: 5000,
        });
      }

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a PropiedadService message with the MessageService */
  private log(message: string) {
    this.mensajes.add(`PropiedadService: ${message}`);
  }
}
