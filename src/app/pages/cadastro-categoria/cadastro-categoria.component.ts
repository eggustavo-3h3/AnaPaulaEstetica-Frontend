import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { categoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-cadastro-categoria',
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
  templateUrl: './cadastro-categoria.component.html',
  styleUrl: './cadastro-categoria.component.css'
})
export class CadastroCategoriaComponent {
  // Variável para armazenar a URL da imagem para preview
  previewUrl: string | ArrayBuffer | null = null;
  // Variável para armazenar a imagem em base64
  selectedFileBase64: string | null = null;
  // Formulário reativo para cadastro de categoria
  formCategoria: FormGroup;
  // Flag para indicar se o formulário foi submetido
  submitted = false;
  // Mensagem de erro para exibir ao usuário
  errorMessage = '';

  // Injeta o serviço de categoria e o FormBuilder
  constructor(private categoriaService: categoriaService, private fb: FormBuilder) {
    // Inicializa o formulário com o campo 'descricao' obrigatório
    this.formCategoria = this.fb.group({
      descricao: ['', Validators.required]
    });
  }

  // Função chamada quando o usuário seleciona um arquivo de imagem
  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      // Quando a leitura do arquivo terminar
      reader.onload = () => {
        this.previewUrl = reader.result; // Mostra o preview da imagem
        const result = reader.result as string;
        // Pega apenas a parte base64 da imagem
        const base64 = result.split(',')[1];
        this.selectedFileBase64 = base64;
      };
      // Lê o arquivo como DataURL (base64)
      reader.readAsDataURL(file);
    }
  }

  // Getter para facilitar o acesso aos controles do formulário no template
  get f() {
    return this.formCategoria.controls;
  }

  // Função chamada ao submeter o formulário
  onSubmit() {
    this.submitted = true;
    // Valida se o formulário está correto e se a imagem foi selecionada
    if (this.formCategoria.invalid || !this.selectedFileBase64) {
      this.errorMessage = 'Preencha todos os campos e selecione uma imagem.';
      return;
    }

    // Monta o objeto categoria conforme esperado pelo backend
    const categoria = {
      descricao: this.formCategoria.value.descricao,
      categoriaImagem: this.selectedFileBase64 // base64 da imagem
    };

    // Chama o serviço para cadastrar a categoria
    this.categoriaService.adicionarCategoria(categoria).subscribe({
      next: () => {
        // Limpa o formulário e variáveis após sucesso
        this.formCategoria.reset();
        this.previewUrl = null;
        this.selectedFileBase64 = null;
        this.submitted = false;
        this.errorMessage = '';
      },
      error: () => {
        // Exibe mensagem de erro caso falhe
        this.errorMessage = 'Erro ao cadastrar categoria.';
      }
    });
  }
}
