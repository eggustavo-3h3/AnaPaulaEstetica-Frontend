import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css'
})
export class PerfilUsuarioComponent implements OnInit {
  usuario: any = null;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    const usuarioId = localStorage.getItem('usuarioId');
    console.log('ID do usuário logado:', usuarioId); // <-- Adicionado para teste
    this.usuarioService.listarUsuario().subscribe({
      next: usuarios => {
        console.log('Usuários retornados:', usuarios); // <-- Adicionado para teste
        this.usuario = usuarios.find(u => u.id === usuarioId);
        console.log('Usuário encontrado:', this.usuario); // <-- Adicionado para teste
      },
      error: err => {
        console.error('Erro ao buscar usuários:', err); // <-- Adicionado para teste
      }
    });
  }
}
