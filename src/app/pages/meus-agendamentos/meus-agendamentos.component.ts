import { Component, OnInit } from '@angular/core';
import { AgendamentoService } from '../../services/agendamento.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-meus-agendamentos',
  templateUrl: './meus-agendamentos.component.html',
  styleUrl: './meus-agendamentos.component.css',
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class MeusAgendamentosComponent implements OnInit {
  agendamentos: any[] = [];

  constructor(private agendamentoService: AgendamentoService) {}

  ngOnInit() {
    this.agendamentoService.listarMeusAgendamentos().subscribe(data => {
      this.agendamentos = data;
      console.log('Meus Agendamentos:', this.agendamentos);
    });
  }
}
