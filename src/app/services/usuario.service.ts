import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { NovoUsuario } from "../model/novo-usuario.model";
import { environment } from "../../environments/environment.development";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})

export class UsuarioService {
    private baseUrl = environment.apiUrl;

    constructor(private http: HttpClient, private authService: AuthService) { }

    adicionarUsuario(usuario: NovoUsuario): Observable<string> {
        // Método para adicionar uma nova Usuario
        return this.http.post<string>(`${this.baseUrl}/usuario/adicionar`, usuario)
    }

    listarUsuario(): Observable<any[]> {
        // Agora busca usuários corretamente
        return this.http.get<any[]>(`${this.baseUrl}/usuario/listar`, { headers: this.authService.getAutheHeaders() });
    }

    atualizarUsuario(usuario: any): Observable<any> {
        // Método para atualizar um Usuario
        return this.http.put<any>(`${this.baseUrl}/usuario/atualizar`, usuario, { headers: this.authService.getAutheHeaders() });
    }

    alterarSenha(usuario: any): Observable<any> {
        // Método para alterar a senha do usuário
        return this.http.put<any>(`${this.baseUrl}/alterar-senha`, usuario, { headers: this.authService.getAutheHeaders() });
    }
}