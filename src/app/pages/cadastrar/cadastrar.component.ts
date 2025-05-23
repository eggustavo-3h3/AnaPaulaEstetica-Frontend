import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NovoUsuario } from '../../model/novo-usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css'],
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
})
export class CadastrarComponent {
  formUsuario: FormGroup;
  submitted = false;
  errorMessage = '';


  constructor(private userService: UsuarioService, private formBuilder: FormBuilder) {
    console.log("buildForm...");
    this.formUsuario = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8)]],
      confirmarSenha: ['', [Validators.required, Validators.minLength(8)]],
    }, {
      validators: this.validatorSenhaEConfirmacao
    });
  }

  validatorSenhaEConfirmacao(form: FormGroup) {
    const senha = form.get('senha')?.value;
    const confirmacaoSenha = form.get('confirmarSenha')?.value;
    return senha === confirmacaoSenha ? null : { senhaNaoConfere: true };
  }

  get f() {
    return this.formUsuario.controls;
  }


  onRegister() {
    this.submitted = true;

    if (this.formUsuario.invalid) {
      return;
    }

    const user: NovoUsuario = {
      nome: this.formUsuario.controls["nome"].value,
      email: this.formUsuario.controls["email"].value,
      confirmarSenha: this.formUsuario.controls["confirmarSenha"].value,
      senha: this.formUsuario.controls["senha"].value
    };


    this.userService.adicionarUsuario(user).subscribe({
      next: (response) => {
        console.log('Usuário cadastrado com sucesso!', response);
        this.formUsuario.reset();
        this.submitted = false;
        // redirecionar para login ou mostrar mensagem
      },
      error: (err) => {
        this.errorMessage = 'Erro ao cadastrar usuário.';
        console.error(err);
      }
    });
  }
}


