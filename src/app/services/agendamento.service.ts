import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agendamento } from '../model/agendamento.model';
import { environment } from '../../environments/environment.development';
import { AuthService } from './auth.service';


@Injectable({ providedIn: 'root' })

export class AgendamentoService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  agendar(agendamento: Agendamento): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/agendamento/adicionar`, agendamento, { headers: this.authService.getAutheHeaders() });
  }

  listarMeusAgendamentos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/agendamento/listar`, { headers: this.authService.getAutheHeaders() });
  }
}