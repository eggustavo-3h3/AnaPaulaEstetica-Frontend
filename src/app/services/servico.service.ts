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
}