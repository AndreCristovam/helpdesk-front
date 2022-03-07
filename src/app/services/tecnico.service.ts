import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_CONFIG } from '../config/api.config';
import { Tecnico } from '../models/tecnicos';


@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  private _refresh$ = new Subject<void>();

  get refresh$(){
    return this._refresh$;
  }

  constructor(private http: HttpClient) { }

  // metodo para trazer um tecnico especifico pelo id
  findById(id: any): Observable<Tecnico> {
    return this.http.get<Tecnico>(`${API_CONFIG.baseUrl}tecnicos/${id}`);
  }

  // metodo de listar todos tecnicos
  findAll(): Observable<Tecnico[]>{
    return this.http.get<Tecnico[]>(`${API_CONFIG.baseUrl}tecnicos`);
  }

  // metodo de criação de novo tecnico
  create(tecnico: Tecnico): Observable<Tecnico> {
      return this.http.post<Tecnico>(`${API_CONFIG.baseUrl}tecnicos`, tecnico)
        .pipe(
          tap(() => {
            this._refresh$.next();
          })
        )
  }

  // metodo para atualização de tecnico
  update(tecnico: Tecnico): Observable<Tecnico> {
    return this.http.put<Tecnico>(`${API_CONFIG.baseUrl}tecnicos/${tecnico.id}`, tecnico)
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      )
  }

  delete(id: any): Observable<Tecnico> {
    return this.http.delete<Tecnico>(`${API_CONFIG.baseUrl}tecnicos/${id}`)
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      )
  }
}
