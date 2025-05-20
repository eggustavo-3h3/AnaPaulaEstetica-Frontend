import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { categoriaService } from '../../../services/categoria.service';
import { CommonModule, NgFor, AsyncPipe } from '@angular/common';
import { Categoria } from '../../../model/categoria.model';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, NgFor, AsyncPipe, RouterLink, RouterOutlet],
  templateUrl: './tipo-servico-list.component.html',
  styleUrls: ['./tipo-servico-list.component.css']
})
export class TipoServicoListComponent implements OnInit {
  categoria$ = new Observable<Categoria[]>();

  constructor(private categoriaService: categoriaService) {}

  listarCategorias() {
    this.categoria$ = this.categoriaService.listarCategorias();
  }

  ngOnInit(): void {
    this.listarCategorias();
  }
}


