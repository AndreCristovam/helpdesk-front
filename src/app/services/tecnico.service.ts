import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Tecnico } from '../models/tecnicos';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

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
      return this.http.post<Tecnico>(`${API_CONFIG.baseUrl}tecnicos`, tecnico);
  }

  // metodo para atualização de tecnico
  update(tecnico: Tecnico): Observable<Tecnico>{
    return this.http.put<Tecnico>(`${API_CONFIG.baseUrl}tecnicos/${tecnico.id}`, tecnico);
  }

  delete(id: any): Observable<Tecnico> {
    return this.http.delete<Tecnico>(`${API_CONFIG.baseUrl}tecnicos/${id}`);
  }
}
