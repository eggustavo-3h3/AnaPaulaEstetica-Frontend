import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-atualizar-senha',
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
  templateUrl: './atualizar-senha.component.html',
  styleUrl: './atualizar-senha.component.css'
})
export class AtualizarSenhaComponent {
  formSenha: FormGroup;
  mensagem: string = '';

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router
  ) {
    this.formSenha = this.fb.group({
      senha: ['', Validators.required],
      novaSenha: ['', Validators.required],
      confirmarNovaSenha: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.formSenha.invalid) {
      this.mensagem = 'Preencha todos os campos.';
      return;
    }

    const { senha, novaSenha, confirmarNovaSenha } = this.formSenha.value;

    this.usuarioService.alterarSenha({
      senha,
      novaSenha,
      confirmarNovaSenha
    }).subscribe({
      next: () => {
        this.mensagem = 'Senha atualizada com sucesso!';
        this.formSenha.reset();
        this.authService.logout();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.mensagem = err.error?.message || 'Erro ao atualizar senha.';
      }
    });
  }
}
