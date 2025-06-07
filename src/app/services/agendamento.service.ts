import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../resources/util';
import { Agendamento } from '../model/agendamento.model';


@Injectable({ providedIn: 'root' })
export class AgendamentoService {
  constructor(private http: HttpClient) {}

  agendar(agendamento: Agendamento): Observable<any> {
    return this.http.post<any>(`${API_BASE_URL}/agendamento/adicionar`, agendamento);
  }

  listarMeusAgendamentos(): Observable<any[]> {
    return this.http.get<any[]>(`${API_BASE_URL}/agendamento/listar`);
  }
}