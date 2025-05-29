import { Component, model } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-agendamento',
  standalone: true,
  imports: [
    MatCardModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './agendamento.component.html',
  styleUrl: './agendamento.component.css'
})
export class AgendamentoComponent {
  selected = model<Date | null>(null);
}
