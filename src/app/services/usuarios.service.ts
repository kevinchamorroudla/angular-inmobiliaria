import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MessagesService } from './messages.service';
import { Observable, of } from 'rxjs';
import { Usuarios } from '../models/Usuarios';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private baseUrl = 'http://localhost:8080/usuarios';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(
    private http: HttpClient,
    private mensajes: MessagesService
  ) { }

  /** GET Usuario by id. Will 404 if id not found */
  getUsuarios(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(this.baseUrl)
      .pipe(
        //tap(_ => this.log('Usuarios obtenidas')),
        catchError(this.handleError<Usuarios[]>('getUsuarios', []))
      );
  }

  /** GET Usuario by id. Will 404 if id not found */
  getSingleUsuario(user_id : string): Observable<Usuarios> {
    const url = `${this.baseUrl}/${user_id}`;
    return this.http.get<Usuarios>(url)
      .pipe(
        //tap(_ => this.log('Usuarios obtenidas')),
        catchError(this.handleError<Usuarios>('getUsuarios'))
      );
  }

  /** GET Usuario by id. Will 404 if id not found */
  addUsuario(Usuario: Usuarios): Observable<Usuarios> {

    return this.http.post<Usuarios>(this.baseUrl, Usuario, this.httpOptions).pipe(
      tap((newUsuario: Usuarios) => this.log(`added Usuario w/ id=${newUsuario.user_id}`)),
      catchError(this.handleError<Usuarios>('addUsuario'))
    );
  }

  /** GET Usuario by id. Will 404 if id not found */
  editUsuario(id : number, Usuario: Usuarios): Observable<Usuarios> {

    return this.http.post<Usuarios>(this.baseUrl + "/update/" + id, Usuario, this.httpOptions).pipe(
      tap((newUsuario: Usuarios) => this.log(`updated Usuario w/ id=${newUsuario.user_id}`)),
      catchError(this.handleError<Usuarios>('editUsuario'))
    );
  }

  /** GET Usuario by id. Will 404 if id not found */
  removeUsuario(id : number): Observable<Usuarios> {

    return this.http.post<Usuarios>(this.baseUrl + "/delete/" + id, null, this.httpOptions).pipe(
      tap(() => this.log(`removed Usuario w/ id=${id}`)),
      catchError(this.handleError<Usuarios>('removeUsuario'))
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

  /** Log a UsuarioService message with the MessageService */
  private log(message: string) {
    this.mensajes.add(`UsuarioService: ${message}`);
  }
}
