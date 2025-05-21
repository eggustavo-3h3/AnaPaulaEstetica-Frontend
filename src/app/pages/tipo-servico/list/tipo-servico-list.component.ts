import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { categoriaService } from '../../../services/categoria.service';
import { CommonModule, NgFor, AsyncPipe } from '@angular/common';
import { Categoria } from '../../../model/categoria.model';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './tipo-servico-list.component.html',
  styleUrls: ['./tipo-servico-list.component.css']
})
export class TipoServicoListComponent implements OnInit {
  categoria$ = new Observable<Categoria[]>();
  categorias: Categoria[] = [];

  constructor(private categoriaService: categoriaService) {}

  listarCategorias() {
    //this.categoria$ = this.categoriaService.listarCategorias();
    this.categoriaService.listarCategorias().subscribe({  
      next: (data) => {
        for (let i = 0; i < data.length; i++) {
          data[i].categoriaImagem = 'data:image/png;base64,' + data[i].categoriaImagem;
        }
        this.categorias = data;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  ngOnInit(): void {
    this.listarCategorias();
  }
}


