import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatToolbarModule, RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AnaPaulaEstetica';
  menuOpen = false; // Estado do menu colapsável
  nomeUsuario: string | null = null;
  perfilUsuario: string | null = null;

  constructor(public authService: AuthService ) {}    

  toggleMenu() {
    this.menuOpen = !this.menuOpen; // Alterna entre aberto e fechado
  }

  ngOnInit() {
    this.authService.getNome$().subscribe(nome => {
      this.nomeUsuario = nome;
    });

    this.authService.getPerfil$().subscribe(perfil => {
      this.perfilUsuario = perfil;
    });
  }  
}
