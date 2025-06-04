import { Component, OnInit, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HorarioService } from '../../services/horario.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agendamento',
  standalone: true,
  imports: [
    MatCardModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    CommonModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './agendamento.component.html',
  styleUrl: './agendamento.component.css'
})
export class AgendamentoComponent implements OnInit {
  selected: Date | null = null;
  horarios: any[] = [];

  constructor(
    private horarioService: HorarioService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AgendamentoComponent>
  ) { }

  ngOnInit(): void {
    // Se quiser carregar horários ao abrir, pode usar a data atual
    const hoje = new Date();
    this.selected = hoje;
    this.listarHorariosPorData(this.formatarData(hoje));
  }

  onDateChange(date: Date) {
    this.selected = date;
    const dataFormatada = this.formatarData(date);
    this.listarHorariosPorData(dataFormatada);
  }

  formatarData(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  listarHorariosPorData(data: string): void {
    this.horarioService.listarHorariosPorData(data).subscribe({
      next: (data) => {
        this.horarios = data;
      },
      error: (error) => {
        console.error('Error fetching available times:', error);
      }
    });
  }
}
