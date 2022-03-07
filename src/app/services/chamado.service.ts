import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_CONFIG } from '../config/api.config';
import { Chamado } from '../models/chamado';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  private _refresh$ = new Subject<void>();

  get refresh$(){
    return this._refresh$;
  }

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Chamado> {
    return this.http.get<Chamado>(`${API_CONFIG.baseUrl}chamados/${id}`);
  }

  findAll(): Observable<Chamado[]> {
    return this.http.get<Chamado[]>(`${API_CONFIG.baseUrl}chamados`);
  }

  create(chamado: Chamado): Observable<Chamado> {
    return this.http.post<Chamado>(`${API_CONFIG.baseUrl}chamados`, chamado)
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      )
  }

  update(chamado: Chamado): Observable<Chamado> {
    return this.http.put<Chamado>(`${API_CONFIG.baseUrl}chamados/${chamado.id}`, chamado)
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      )
  }
}
