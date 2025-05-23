import { Injectable } from "@angular/core";
import { API_BASE_URL } from "../resources/util";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { NovoUsuario } from "../model/novo-usuario.model";

@Injectable({
    providedIn: 'root'
})

export class UsuarioService {
    private urlBase = API_BASE_URL;

    constructor(private http: HttpClient) { }

    adicionarUsuario(usuario: NovoUsuario): Observable<string> {
        // Método para adicionar uma nova Usuario
        return this.http.post<string>(`${this.urlBase}/usuario/adicionar`, usuario)
    }
}