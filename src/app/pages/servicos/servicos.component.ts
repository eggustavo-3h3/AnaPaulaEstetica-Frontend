import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicoService } from '../../services/servico.service';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AgendamentoComponent } from '../agendamento/agendamento.component';

@Component({
  selector: 'app-servicos',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatCardModule],
  templateUrl: './servicos.component.html',
  styleUrl: './servicos.component.css'
})
export class ServicosComponent implements OnInit {
  servicos: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private servicoService: ServicoService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.listarServicosPorCategoria(id);
    }
  }

  listarServicosPorCategoria(id: string): void {
    this.servicoService.listarPorCategoria(id).subscribe({
      next: (data) => {
        this.servicos = data;
        console.log(data)
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  openAgendamentoModal(servico: any) {
    this.dialog.open(AgendamentoComponent, {
      data: { servico },
      autoFocus: false,
      restoreFocus: false,
      panelClass: 'agendamento-modal-panel' // Adicione esta linha!
    });
  }
}
