import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { categoriaService } from '../../../services/categoria.service';
import { CommonModule } from '@angular/common';
import { Categoria } from '../../../model/categoria.model';


@Component({
  selector: 'app-list',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './tipo-servico-list.component.html',
  styleUrl: './tipo-servico-list.component.css'
})

export class TipoServicoListComponent implements OnInit {
  constructor(private categoriaService : categoriaService){}
 
  categoria$ = new Observable<Categoria[]>();

  listarCategorias(){
   this.categoria$ = this.categoriaService.listarCategorias();
  }

  ngOnInit(): void {
    this.listarCategorias();
  }
}