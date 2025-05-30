import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [MatButtonModule, MatMenuModule, MatToolbarModule, RouterOutlet, RouterLink, MatIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AnaPaulaEstetica';
  menuOpen = false; // Estado do menu colapsável

  toggleMenu() {
    this.menuOpen = !this.menuOpen; // Alterna entre aberto e fechado
  }
}
