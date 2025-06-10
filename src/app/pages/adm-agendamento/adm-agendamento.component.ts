import { Component, OnInit } from '@angular/core';
import { AgendamentoService } from '../../services/agendamento.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adm-agendamento',
  templateUrl: './adm-agendamento.component.html',
  styleUrl: './adm-agendamento.component.css',
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class AdmAgendamentoComponent implements OnInit {
  agendamentos: any[] = [];

  constructor(private agendamentoService: AgendamentoService) {}

  ngOnInit() {
    this.agendamentoService.listarTodosAgendamentos().subscribe(data => {
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      this.agendamentos = data
        .filter(a => {
          const [ano, mes, dia] = a.data.split('-').map(Number);
          const dataAgendamento = new Date(ano, mes - 1, dia);
          dataAgendamento.setHours(0, 0, 0, 0);
          return dataAgendamento >= hoje;
        })
        .sort((a, b) => {
          // Junta data e hora para comparar
          const dataA = new Date(`${a.data}T${a.horaInicial}`);
          const dataB = new Date(`${b.data}T${b.horaInicial}`);
          return dataA.getTime() - dataB.getTime(); // Mais atual primeiro
        });
    });
  }

  cancelarAgendamento(id: string) {
    if (confirm('Tem certeza que deseja cancelar este agendamento?')) {
      this.agendamentoService.cancelarAgendamento(id).subscribe({
        next: () => {
          this.agendamentos = this.agendamentos.filter(a => a.id !== id);
        },
        error: () => {
          alert('Erro ao cancelar agendamento.');
        }
      });
    }
  }
}
