import { Injectable } from "@angular/core";
import { API_BASE_URL } from "../resources/util";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ServicoService {
    private urlBase = API_BASE_URL;

    constructor(private http: HttpClient) { }

    listarPorCategoria(id: string): Observable<any> {
        return this.http.get<any[]>(`${this.urlBase}/produto/listar-por-categoria/${id}`);
    }

    adicionarServico(servico: any): Observable<any> {
        // Método para adicionar um novo serviço/produto
        return this.http.post<any>(`${this.urlBase}/produto/adicionar`, servico);
    }

    listarServicos(): Observable<any[]> {
        return this.http.get<any[]>(`${this.urlBase}/produto/listar`);
    }

    atualizarServico(servico: any): Observable<any> {
        return this.http.put<any>(`${this.urlBase}/produto/atualizar`, servico);
    }

    deletarServico(id: string) {
        return this.http.delete(`${this.urlBase}/produto/deletar/${id}`);
    }
}