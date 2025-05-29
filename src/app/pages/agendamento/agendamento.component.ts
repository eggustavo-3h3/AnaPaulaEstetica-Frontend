import {Component, model} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-agendamento',
  standalone: true,
  imports: [MatCardModule, MatDatepickerModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './agendamento.component.html',
  styleUrl: './agendamento.component.css'
})
export class AgendamentoComponent {
  selected = model<Date | null>(null);
}
