import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-atualizar-perfil',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './atualizar-perfil.component.html',
  styleUrl: './atualizar-perfil.component.css'
})
export class AtualizarPerfilComponent implements OnInit {
  formPerfil: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.formPerfil = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    const usuarioId = localStorage.getItem('usuarioId');
    this.usuarioService.listarUsuario().subscribe(usuarios => {
      const usuario = usuarios.find(u => u.id === usuarioId);
      if (usuario) {
        this.formPerfil.patchValue({
          nome: usuario.nome,
          email: usuario.email
        });
      }
    });
  }

  onSubmit() {
    if (this.formPerfil.invalid) return;

    const usuarioId = localStorage.getItem('usuarioId');
    const usuarioAtualizado = {
      id: usuarioId,
      nome: this.formPerfil.value.nome,
      email: this.formPerfil.value.email
    };

    this.usuarioService.atualizarUsuario(usuarioAtualizado).subscribe(() => {
      this.snackBar.open('Perfil atualizado com sucesso!', 'Fechar', { duration: 3000 });
      this.router.navigate(['/perfil-usuario']);
    });
  }
}
