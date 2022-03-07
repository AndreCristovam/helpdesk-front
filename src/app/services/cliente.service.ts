import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_CONFIG } from '../config/api.config';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private _refresh$ = new Subject<void>();

  get refresh$(){
    return this._refresh$;
  }

  constructor(private http: HttpClient) { }

  // metodo para trazer um cliente especifico pelo id
  findById(id: any): Observable<Cliente> {
    return this.http.get<Cliente>(`${API_CONFIG.baseUrl}clientes/${id}`);
  }

  // metodo de listar todos clientes
  findAll(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${API_CONFIG.baseUrl}clientes`);
  }

  // metodo de criação de novo cliente
  create(cliente: Cliente): Observable<Cliente> {
      return this.http.post<Cliente>(`${API_CONFIG.baseUrl}clientes`, cliente)
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      )
  }

  // metodo para atualização de cliente
  update(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${API_CONFIG.baseUrl}clientes/${cliente.id}`, cliente)
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      )
  }

  delete(id: any): Observable<Cliente> {
    return this.http.delete<Cliente>(`${API_CONFIG.baseUrl}clientes/${id}`);
  }
}
