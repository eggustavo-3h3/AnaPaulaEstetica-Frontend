import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.development";

@Injectable({
    providedIn: 'root'
})

export class ServicoService {
    private baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    listarPorCategoria(id: string): Observable<any> {
        return this.http.get<any[]>(`${this.baseUrl}/produto/listar-por-categoria/${id}`);
    }

    adicionarServico(servico: any): Observable<any> {
        // Método para adicionar um novo serviço/produto
        return this.http.post<any>(`${this.baseUrl}/produto/adicionar`, servico);
    }

    listarServicos(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/produto/listar`);
    }

    atualizarServico(servico: any): Observable<any> {
        return this.http.put<any>(`${this.baseUrl}/produto/atualizar`, servico);
    }

    deletarServico(id: string) {
        return this.http.delete(`${this.baseUrl}/produto/deletar/${id}`);
    }
}