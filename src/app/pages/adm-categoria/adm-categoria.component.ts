import { Component, OnInit } from '@angular/core';
import { categoriaService } from '../../services/categoria.service';
import { ServicoService } from '../../services/servico.service';
import { NgClass, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-adm-categoria',
  templateUrl: './adm-categoria.component.html',
  styleUrls: ['./adm-categoria.component.css'],
  standalone: true,
  imports: [
    NgClass,
    CommonModule,
    FormsModule,
    RouterModule
  ],
})
export class AdmCategoriaComponent implements OnInit {
  tipoSelecionado: 'categoria' | 'servico' = 'categoria';
  categorias: any[] = [];
  servicos: any[] = [];

  constructor(
    private categoriaService: categoriaService,
    private servicoService: ServicoService
  ) {}

  ngOnInit() {
    this.categoriaService.listarCategorias().subscribe(data => this.categorias = data);
    this.servicoService.listarServicos().subscribe(data => this.servicos = data);
    console.log('Categorias:', this.categorias);
    console.log('Serviços:', this.servicos);
  }
  
  itensFiltrados() {
    return this.tipoSelecionado === 'categoria' ? this.categorias : this.servicos;
  }

  getNome(item: any): string {
    return item.nome || item.descricao || '';
  }
}
