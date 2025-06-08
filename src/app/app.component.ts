import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatToolbarModule, RouterOutlet, RouterLink, MatIcon, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AnaPaulaEstetica';
  menuOpen = false; // Estado do menu colapsável

  isAdmin$!: Observable<boolean>;

  constructor(public authService: AuthService ) {}    

  ngOnInit(): void {
    // Verifica se o usuário é admin
    this.isAdmin$ = this.authService.isAdmin$();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen; // Alterna entre aberto e fechado
  }

  // isAdmin(): boolean {
  //   return this.authService.IsAdmin();
  // }
}
