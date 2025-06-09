import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-enviar-email',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './enviar-email.component.html',
  styleUrl: './enviar-email.component.css'
})
export class EnviarEmailComponent {
  email: string = '';

  constructor(private usuarioService: UsuarioService) {}

  onSubmit() {
    if (!this.email) return;
    this.usuarioService.enviarEmail({ email: this.email }).subscribe({
      next: () => alert('E-mail enviado com sucesso!'),
      error: () => alert('Erro ao enviar e-mail.')
    });
  }
}
