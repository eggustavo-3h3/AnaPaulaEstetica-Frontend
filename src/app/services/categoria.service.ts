import { Injectable } from "@angular/core";
import { API_BASE_URL } from "../resources/util";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Categoria } from "../model/categoria.model";

@Injectable({
   providedIn : 'root'
})

export class categoriaService{
    private urlBase = API_BASE_URL;

    constructor(private http : HttpClient) {}

    listarCategorias() : Observable<Categoria[]> {
        //Metodo para listar as categorias cadastradas
       return this.http.get<Categoria[]>(`${this.urlBase}/categoria/listar`);
    }

    adicionarCategoria(categoria: Categoria) : Observable<Categoria[]> {
        // Método para adicionar uma nova Categoria
        return this.http.post<Categoria[]>(`${this.urlBase}/categoria/adicionar`, categoria)
    }
     
    atualizarCategoria(categoria: any) {
        // Método para atualizar uma Categoria
        return this.http.put(`${this.urlBase}/categoria/atualizar`, categoria);
    }   
}