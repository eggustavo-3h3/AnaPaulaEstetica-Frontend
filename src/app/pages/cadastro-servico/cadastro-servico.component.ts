import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOption } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { categoriaService } from '../../services/categoria.service';
import { ServicoService } from '../../services/servico.service'; // Supondo que exista esse service

@Component({
  selector: 'app-cadastro-servico',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterModule,
    MatOption,
    MatSelect
  ],
  templateUrl: './cadastro-servico.component.html',
  styleUrl: './cadastro-servico.component.css'
})
export class CadastroServicoComponent implements OnInit {
  previewUrl: string | ArrayBuffer | null = null;
  selectedFileBase64: string | null = null;
  formServico: FormGroup;
  categorias: any[] = [];
  submitted = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private categoriaService: categoriaService,
    private servicoService: ServicoService // Supondo que exista esse service
  ) {
    this.formServico = this.fb.group({
      descricao: ['', Validators.required],
      tempo: ['', Validators.required],
      preco: ['', Validators.required],
      categoriaId: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Carrega as categorias para o select
    this.categoriaService.listarCategorias().subscribe({
      next: (data) => this.categorias = data,
      error: () => this.errorMessage = 'Erro ao carregar categorias.'
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
        const result = reader.result as string;
        // Salva o base64 já com o prefixo para envio correto
        this.selectedFileBase64 = result; // já vem com "data:image/png;base64," ou similar
      };
      reader.readAsDataURL(file);
    }
  }

  get f() {
    return this.formServico.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.formServico.invalid || !this.selectedFileBase64) {
      this.errorMessage = 'Preencha todos os campos e selecione uma imagem.';
      return;
    }

    // Envia a imagem já com o prefixo
    const servico = {
      descricao: this.formServico.value.descricao,
      tempo: this.formServico.value.tempo,
      preco: this.formServico.value.preco,
      categoriaId: this.formServico.value.categoriaId,
      imagens: [
        { imagem: this.selectedFileBase64 }
      ]
    };

    this.servicoService.adicionarServico(servico).subscribe({
      next: () => {
        this.formServico.reset();
        this.previewUrl = null;
        this.selectedFileBase64 = null;
        this.submitted = false;
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Erro ao cadastrar serviço.';
      }
    });
  }
}
