import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { categoriaService } from '../../services/categoria.service';
import { MatOption, MatSelectModule, MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-categoria-atualizar',
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
    MatSelectModule,
    MatOption
  ],
  templateUrl: './categoria-atualizar.component.html',
  styleUrl: './categoria-atualizar.component.css'
})
export class CategoriaAtualizarComponent implements OnInit {
  formCategoria: FormGroup;
  categorias: any[] = [];
  previewUrl: string | ArrayBuffer | null = null;
  selectedFileBase64: string | null = null;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(private fb: FormBuilder, private categoriaService: categoriaService) {
    this.formCategoria = this.fb.group({
      id: ['', Validators.required],
      descricao: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.categoriaService.listarCategorias().subscribe(data => {
      this.categorias = data;
    });
  }

  // Ao selecionar uma categoria, preenche os campos e o preview
  onCategoriaChange(event: MatSelectChange) {
    const id = event.value;
    const categoria = this.categorias.find(c => c.id === id);
    if (categoria) {
      this.formCategoria.patchValue({
        descricao: categoria.descricao
      });
      // Remove o prefixo se existir
      if (categoria.categoriaImagem) {
        if (typeof categoria.categoriaImagem === 'string' && categoria.categoriaImagem.startsWith('data:')) {
          this.previewUrl = categoria.categoriaImagem;
          // Remove o prefixo para enviar só o base64 puro
          this.selectedFileBase64 = categoria.categoriaImagem.split(',')[1];
        } else {
          this.previewUrl = 'data:image/png;base64,' + categoria.categoriaImagem;
          this.selectedFileBase64 = categoria.categoriaImagem;
        }
      } else {
        this.previewUrl = null;
        this.selectedFileBase64 = null;
      }
      if (this.fileInput) {
        this.fileInput.nativeElement.value = '';
      }
    }
  }

  // Ao selecionar um novo arquivo, atualiza o preview e o base64
  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
        // Remove o prefixo para enviar só o base64 puro
        const result = reader.result as string;
        this.selectedFileBase64 = result.split(',')[1];
      };
      reader.readAsDataURL(file);
    }
  }

  // Dispara o clique do input de arquivo
  onImageUploadClick() {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }

  onSubmit() {
    if (this.formCategoria.invalid || !this.selectedFileBase64) return;

    const categoriaAtualizada = {
      id: this.formCategoria.value.id,
      descricao: this.formCategoria.value.descricao,
      categoriaImagem: this.selectedFileBase64 // só o base64 puro
    };

    this.categoriaService.atualizarCategoria(categoriaAtualizada).subscribe(() => {
      // Limpa os campos após atualizar
      this.formCategoria.reset();
      this.previewUrl = null;
      this.selectedFileBase64 = null;
      if (this.fileInput) {
        this.fileInput.nativeElement.value = '';
      }
    });
  }
}
