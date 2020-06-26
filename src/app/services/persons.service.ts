import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Persons } from '../models/Persons';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  private baseUrl = 'http://localhost:8080/persons';

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
  getPersonas(): Observable<Persons[]> {
    return this.http.get<Persons[]>(this.baseUrl)
      .pipe(
        //tap(_ => this.log('Personas obtenidas')),
        catchError(this.handleError<Persons[]>('getPersonas', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  addPersona(person: Persons): Observable<Persons> {

    return this.http.post<Persons>(this.baseUrl, person, this.httpOptions).pipe(
      tap((newHero: Persons) => this.log(`added person w/ id=${newHero.id}`)),
      catchError(this.handleError<Persons>('addPersona'))
    );
  }

  /** GET hero by id. Will 404 if id not found */
  editPersona(id : number, person: Persons): Observable<Persons> {

    return this.http.post<Persons>(this.baseUrl + "/update/" + id, person, this.httpOptions).pipe(
      tap((newHero: Persons) => this.log(`updated person w/ id=${newHero.id}`)),
      catchError(this.handleError<Persons>('editPersona'))
    );
  }

  /** GET hero by id. Will 404 if id not found */
  removePersona(id : number): Observable<Persons> {

    return this.http.post<Persons>(this.baseUrl + "/delete/" + id, null, this.httpOptions).pipe(
      tap(() => this.log(`removed person w/ id=${id}`)),
      catchError(this.handleError<Persons>('removePersona'))
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

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.mensajes.add(`HeroService: ${message}`);
  }

}
