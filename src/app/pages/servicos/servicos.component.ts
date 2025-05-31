import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicoService } from '../../services/servico.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-servicos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './servicos.component.html',
  styleUrl: './servicos.component.css'
})
export class ServicosComponent implements OnInit {
  servicos: any[] = []; // Adjust type as needed

  constructor
  (private route: ActivatedRoute,
   private servicoService: ServicoService
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
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }
}
