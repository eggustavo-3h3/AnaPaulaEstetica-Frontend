import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Categoria } from "../model/categoria.model";
import { environment } from "../../environments/environment.development";

@Injectable({
   providedIn : 'root'
})

export class categoriaService{
    private baseUrl = environment.apiUrl;

    constructor(private http : HttpClient) {}

    listarCategorias() : Observable<Categoria[]> {
        //Metodo para listar as categorias cadastradas
       return this.http.get<Categoria[]>(`${this.baseUrl}/categoria/listar`);
    }

    adicionarCategoria(categoria: Categoria) : Observable<Categoria[]> {
        // Método para adicionar uma nova Categoria
        return this.http.post<Categoria[]>(`${this.baseUrl}/categoria/adicionar`, categoria)
    }
     
    atualizarCategoria(categoria: any) {
        // Método para atualizar uma Categoria
        return this.http.put(`${this.baseUrl}/categoria/atualizar`, categoria);
    }   

    deletarCategoria(id: string) {
        return this.http.delete(`${this.baseUrl}/categoria/deletar/${id}`);
    }
}