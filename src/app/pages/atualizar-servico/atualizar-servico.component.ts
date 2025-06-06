import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOption } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { categoriaService } from '../../services/categoria.service';
import { ServicoService } from '../../services/servico.service';

@Component({
  selector: 'app-atualizar-servico',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    MatOption,
    MatSelect
  ],
  templateUrl: './atualizar-servico.component.html',
  styleUrl: './atualizar-servico.component.css'
})
export class ServicoAtualizarComponent implements OnInit {
  formServico: FormGroup;
  servicos: any[] = [];
  categorias: any[] = [];
  selectedFileBase64: string = '';
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private servicoService: ServicoService,
    private categoriaService: categoriaService
  ) {
    this.formServico = this.fb.group({
      id: ['', Validators.required],
      descricao: ['', Validators.required],
      tempo: ['', Validators.required],
      preco: ['', Validators.required],
      categoriaId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.servicoService.listarServicos().subscribe(data => this.servicos = data);
    this.categoriaService.listarCategorias().subscribe(data => this.categorias = data);
  }

  onServicoChange(event: MatSelectChange) {
    const id = event.value;
    const servico = this.servicos.find(s => s.id === id);
    console.log('Serviço selecionado:', servico);
    if (servico) {
      this.formServico.patchValue({
        descricao: servico.descricao,
        tempo: servico.tempo,
        preco: servico.preco,
        categoriaId: servico.categoriaId
      });
      // Agora só verifica o campo imagem
      this.selectedFileBase64 = servico.imagem ? servico.imagem : '';
      if (this.fileInput) this.fileInput.nativeElement.value = '';
    }
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedFileBase64 = reader.result?.toString() ?? '' ;
        console.log('xx -> ', this.selectedFileBase64)
      };
      reader.readAsDataURL(file);
    }
  }

  onImageUploadClick() {
    if (this.fileInput) this.fileInput.nativeElement.click();
  }

  onSubmit() {
    if (this.formServico.invalid || !this.selectedFileBase64) return;

    const servicoAtualizado = {
      id: this.formServico.value.id,
      descricao: this.formServico.value.descricao,
      tempo: this.formServico.value.tempo,
      preco: this.formServico.value.preco,
      imagem: this.selectedFileBase64,
      categoriaId: this.formServico.value.categoriaId
    };

    console.log('Enviando para o backend:', servicoAtualizado);

    this.servicoService.atualizarServico(servicoAtualizado).subscribe(() => {
      this.formServico.reset();
      this.selectedFileBase64 = '';
      if (this.fileInput) this.fileInput.nativeElement.value = '';
    });
  }
}

