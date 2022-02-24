import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

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
      return this.http.post<Cliente>(`${API_CONFIG.baseUrl}clientes`, cliente);
  }

  // metodo para atualização de cliente
  update(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${API_CONFIG.baseUrl}clientes/${cliente.id}`, cliente);
  }

  delete(id: any): Observable<Cliente> {
    return this.http.delete<Cliente>(`${API_CONFIG.baseUrl}clientes/${id}`);
  }
}
