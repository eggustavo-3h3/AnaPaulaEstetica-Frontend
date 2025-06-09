import { Component, OnInit, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HorarioService } from '../../services/horario.service';
import { AgendamentoService } from '../../services/agendamento.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-agendamento',
  standalone: true,
  imports: [
    MatCardModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    NgxMaskDirective, 
    NgxMaskPipe
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './agendamento.component.html',
  styleUrl: './agendamento.component.css'
})
export class AgendamentoComponent implements OnInit {
  selected: Date | null = null;
  horarios: any[] = [];
  horariosDisponiveis: any[] = []; // Adicione esta linha
  horarioSelecionado: string = '';

  constructor(
    private horarioService: HorarioService,
    private agendamentoService: AgendamentoService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AgendamentoComponent>,
    private router: Router
  ) { }

  ngOnInit(): void {
    const hoje = new Date();
    this.selected = hoje;
    const dataFormatada = this.formatarDataParaBusca(hoje);
    console.log('Abrindo modal para produtoId:', this.data.servico.id, 'data:', dataFormatada);
    this.listarHorariosPorData(dataFormatada);
  }

  onDateChange(date: Date) {
    this.selected = date;
    const dataFormatada = this.formatarDataParaBusca(date);
    this.listarHorariosPorData(dataFormatada);
  }

  formatarDataParaBusca(date: Date): string {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`; // MM/DD/YYYY
  }

  formatarDataParaAgendamento(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // YYYY-MM-DD
  }

  listarHorariosPorData(data: string): void {
    this.horarioService.listarHorariosDisponiveis(data).subscribe({
      next: (horarios) => {
        console.log('Horários recebidos:', horarios);
        this.horarios = horarios;
        this.horariosDisponiveis = horarios.filter(h => !h.ocupado); // Filtra aqui!
      },
      error: (error) => {
        console.error('Erro ao buscar horários disponíveis:', error);
      }
    });
  }

  agendarEFinalizar() {
    if (!this.horarioSelecionado) {
      alert('Selecione um horário!');
      return;
    }
    const agendamento = {
      produtoId: this.data.servico.id,
      data: this.formatarDataParaAgendamento(this.selected!),
      hora: this.horarioSelecionado
    };
    console.log('Agendando:', agendamento);

    this.agendamentoService.agendar(agendamento).toPromise()
      .then(() => {
        this.dialogRef.close();
        this.router.navigate(['/meus-agendamentos']);
      })
      .catch((err) => {
        console.error('Erro ao agendar:', err);
        alert('Erro ao agendar!');
      });
  }
}
