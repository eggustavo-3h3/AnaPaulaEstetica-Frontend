import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../resources/util';

@Injectable({ providedIn: 'root' })
export class AgendamentoService {
  constructor(private http: HttpClient) {}

  agendar(agendamento: { produtoId: string, data: string, hora: string }) {
    return this.http.post(`${API_BASE_URL}/agendamento/adicionar`, agendamento);
}

  listarMeusAgendamentos(): Observable<any[]> {
    return this.http.get<any[]>('/agendamento/meus');
}
}