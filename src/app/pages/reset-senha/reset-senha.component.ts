import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-redefinir-senha',
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
  templateUrl: './reset-senha.component.html',
  styleUrl: './reset-senha.component.css'
})
export class ResetSenhaComponent implements OnInit {
  chave: string = '';
  novaSenha: string = '';
  confirmarSenha: string = '';

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.chave = this.route.snapshot.paramMap.get('chave-reset') || '';
  }

  onSubmit() {
    if (!this.novaSenha || !this.confirmarSenha) {
      alert('Preencha todos os campos!');
      return;
    }
    if (this.novaSenha !== this.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    const payload = {
      chaveResetSenha: this.chave,
      novaSenha: this.novaSenha,
      confirmarNovaSenha: this.confirmarSenha
    };
    this.usuarioService.resetarSenha(payload).subscribe({
      next: () => alert('Senha redefinida com sucesso!'),
      error: () => alert('Erro ao redefinir senha.')
    });
  }
}
