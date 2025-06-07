import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { categoriaService } from '../../services/categoria.service';
import { ServicoService } from '../../services/servico.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deletar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './deletar.component.html',
  styleUrl: './deletar.component.css'
})
export class DeletarComponent implements OnInit {
  id: string = '';
  tipo: string = '';
  mensagem = '';
  loading = false;
  item: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriaService: categoriaService,
    private servicoService: ServicoService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.tipo = this.route.snapshot.queryParamMap.get('tipo') || '';
    if (this.id && this.tipo) {
      if (this.tipo === 'categoria') {
        this.categoriaService.listarCategorias().subscribe(lista => {
          this.item = lista.find((c: any) => c.id == this.id);
        });
      } else {
        this.servicoService.listarServicos().subscribe(lista => {
          this.item = lista.find((s: any) => s.id == this.id);
        });
      }
    }
  }

  deletar() {
    if (!this.id || !this.tipo) return;
    this.loading = true;
    if (this.tipo === 'categoria') {
      this.categoriaService.deletarCategoria(this.id).subscribe({
        next: () => {
          this.mensagem = 'Categoria deletada com sucesso!';
          this.loading = false;
          setTimeout(() => this.router.navigate(['/adm-categoria']), 1200);
        },
        error: () => {
          this.mensagem = 'Erro ao deletar categoria.';
          this.loading = false;
        }
      });
    } else {
      this.servicoService.deletarServico(this.id).subscribe({
        next: () => {
          this.mensagem = 'Serviço deletado com sucesso!';
          this.loading = false;
          setTimeout(() => this.router.navigate(['/adm-categoria']), 1200);
        },
        error: () => {
          this.mensagem = 'Erro ao deletar serviço.';
          this.loading = false;
        }
      });
    }
  }

  cancelar() {
    this.router.navigate(['/adm-categoria']);
  }
}
