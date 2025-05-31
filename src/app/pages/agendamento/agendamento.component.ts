import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HorarioService } from '../../services/horario.service';

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
    private route: ActivatedRoute,
    private horarioService: HorarioService
  ) { }

  ngOnInit(): void {
    const data = this.route.snapshot.paramMap.get('data');
    if (data) {
      this.listarHorariosPorData(data);
    }
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
