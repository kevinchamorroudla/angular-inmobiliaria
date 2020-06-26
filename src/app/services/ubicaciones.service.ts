import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Paises } from '../models/Paises';
import { Estados } from '../models/Estados';
import { Ciudades } from '../models/Ciudades';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class UbicacionesService {

  private baseUrl = 'http://localhost:8080/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(
    private http: HttpClient,
    private mensajes: MessagesService
  ) { }

  /** GET hero by id. Will 404 if id not found */
  getPaises(): Observable<Paises[]> {
    return this.http.get<Paises[]>(this.baseUrl + "paises")
      .pipe(
        //tap(_ => this.log('Paises obtenidas')),
        catchError(this.handleError<Paises[]>('getPaises', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  addPais(pais: Paises): Observable<Paises> {

    return this.http.post<Paises>(this.baseUrl + "paises", pais, this.httpOptions).pipe(
      tap((newHero: Paises) => this.log(`added pais w/ id=${newHero.id}`)),
      catchError(this.handleError<Paises>('addPais'))
    );
  }

  /** GET hero by id. Will 404 if id not found */
  editPais(id : number, pais: Paises): Observable<Paises> {

    return this.http.post<Paises>(this.baseUrl + "paises" + "/update/" + id, pais, this.httpOptions).pipe(
      tap((newHero: Paises) => this.log(`updated pais w/ id=${newHero.id}`)),
      catchError(this.handleError<Paises>('editPais'))
    );
  }

  /** GET hero by id. Will 404 if id not found */
  removePais(id : number): Observable<Paises> {

    return this.http.post<Paises>(this.baseUrl + "paises" + "/delete/" + id, null, this.httpOptions).pipe(
      tap(() => this.log(`removed pais w/ id=${id}`)),
      catchError(this.handleError<Paises>('removePais'))
    );
  }

  /** GET hero by id. Will 404 if id not found */
  getEstados(): Observable<Estados[]> {
    return this.http.get<Estados[]>(this.baseUrl + "estados")
      .pipe(
        //tap(_ => this.log('Estados obtenidas')),
        catchError(this.handleError<Estados[]>('getEstados', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  addEstados(estado: Estados): Observable<Estados> {

    return this.http.post<Estados>(this.baseUrl + "estados", estado, this.httpOptions).pipe(
      tap((newHero: Estados) => this.log(`added estado w/ id=${newHero.id}`)),
      catchError(this.handleError<Estados>('addEstados'))
    );
  }

  /** GET hero by id. Will 404 if id not found */
  editEstados(id : number, estado: Estados): Observable<Estados> {

    return this.http.post<Estados>(this.baseUrl + "estados" + "/update/" + id, estado, this.httpOptions).pipe(
      tap((newHero: Estados) => this.log(`updated estado w/ id=${newHero.id}`)),
      catchError(this.handleError<Estados>('editEstados'))
    );
  }

  /** GET hero by id. Will 404 if id not found */
  removeEstados(id : number): Observable<Estados> {

    return this.http.post<Estados>(this.baseUrl + "estados" + "/delete/" + id, null, this.httpOptions).pipe(
      tap(() => this.log(`removed estado w/ id=${id}`)),
      catchError(this.handleError<Estados>('removeEstados'))
    );
  }

  /** GET hero by id. Will 404 if id not found */
  getCiudades(): Observable<Ciudades[]> {
    return this.http.get<Ciudades[]>(this.baseUrl + "ciudades")
      .pipe(
        //tap(_ => this.log('Ciudades obtenidas')),
        catchError(this.handleError<Ciudades[]>('getCiudades', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getCiudadesPorEstado(value): Observable<Ciudades[]> {
    return this.http.get<Ciudades[]>(this.baseUrl + "ciudades/obtenerPorEstado/" + value)
      .pipe(
        //tap(_ => this.log('Ciudades obtenidas')),
        catchError(this.handleError<Ciudades[]>('getCiudades', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  addCiudades(ciudad: Ciudades): Observable<Ciudades> {

    return this.http.post<Ciudades>(this.baseUrl + "ciudades", ciudad, this.httpOptions).pipe(
      tap((newHero: Ciudades) => this.log(`added ciudad w/ id=${newHero.id}`)),
      catchError(this.handleError<Ciudades>('addCiudades'))
    );
  }

  /** GET hero by id. Will 404 if id not found */
  editCiudades(id : number, ciudad: Ciudades): Observable<Paises> {

    return this.http.post<Ciudades>(this.baseUrl + "ciudades" + "/update/" + id, ciudad, this.httpOptions).pipe(
      tap((newHero: Ciudades) => this.log(`updated ciudad w/ id=${newHero.id}`)),
      catchError(this.handleError<Ciudades>('editCiudades'))
    );
  }

  /** GET hero by id. Will 404 if id not found */
  removeCiudades(id : number): Observable<Paises> {

    return this.http.post<Ciudades>(this.baseUrl + "ciudades" + "/delete/" + id, null, this.httpOptions).pipe(
      tap(() => this.log(`removed ciudad w/ id=${id}`)),
      catchError(this.handleError<Ciudades>('removeCiudades'))
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

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a UbicacionesService message with the MessageService */
  private log(message: string) {
    this.mensajes.add(`UbicacionesService: ${message}`);
  }
}
