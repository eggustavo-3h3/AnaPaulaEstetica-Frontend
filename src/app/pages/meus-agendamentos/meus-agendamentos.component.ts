import { Component, OnInit } from '@angular/core';
import { AgendamentoService } from '../../services/agendamento.service';

@Component({
  selector: 'app-meus-agendamentos',
  templateUrl: './meus-agendamentos.component.html',
  styleUrl: './meus-agendamentos.component.css',
  standalone: true,
  imports: []
})
export class MeusAgendamentosComponent implements OnInit {
  agendamentos: any[] = [];

  constructor(private agendamentoService: AgendamentoService) {}

  ngOnInit() {
    this.agendamentoService.listarMeusAgendamentos().subscribe(data => {
      this.agendamentos = data;
    });
  }
}
