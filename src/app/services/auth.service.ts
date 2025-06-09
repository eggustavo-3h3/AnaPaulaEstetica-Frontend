import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment.development";

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    private baseUrl = environment.apiUrl;

    private tokenSubject = new BehaviorSubject<string | null>(
       localStorage.getItem('token')
    );

    private nomeSubject = new BehaviorSubject<string | null>(null);

    private perfilSubject = new BehaviorSubject<string | null>(null);

    setNome(perfil: string) {
        this.nomeSubject.next(perfil);
    }

    getNome$(): Observable<string | null> {
        return this.nomeSubject.asObservable();
    }

    getNomeAtual(): string | null {
        return this.nomeSubject.value;
    }

    setPerfil(perfil: string) {
        this.perfilSubject.next(perfil);
    }

    getPerfil$(): Observable<string | null> {
        return this.perfilSubject.asObservable();
    }

    getPerfilAtual(): string | null {
        return this.perfilSubject.value;
    }    

    token: any;

    constructor(private http: HttpClient, private router: Router){}

    login(username: string, password: string): Observable<string>{
        return new Observable(observable =>{
            this.http.post<string>(`${this.baseUrl}/autenticar`,{
                login: username,
                senha: password
            }).subscribe({
                next: (response) => {
                    localStorage.setItem('token', response);
                    this.tokenSubject.next(response);

                    const payload = this.decodeJwtPayload(response);
                    if (payload && payload.Perfil) {
                        this.setNome(payload.Nome);
                        this.setPerfil(payload.Perfil);
                    } else {
                        this.setPerfil('usuario'); // Define um perfil padrão se não estiver presente no token
                    }

                    observable.next(response);
                    observable.complete();
                },
                error: (error) => {
                    console.error('Erro ao autenticar:', error);
                    observable.error(error);
                    observable.complete();
                }
            });
        });        
    }

    logout(){
        localStorage.removeItem('token');
        this.tokenSubject.next(null);
        this.nomeSubject.next(null);
        this.perfilSubject.next(null);
        this.router.navigate(['/']);
    }

    isAuthenticated(): boolean{
        return !!this.tokenSubject.value;
    }

    getAutheHeaders(){
        return new HttpHeaders({
            'Authorization':`Bearer ${this.token}`
        });
    }

    decodeJwtPayload(token: string): any {
        try {
          const payload = token.split('.')[1];
          return JSON.parse(atob(payload));
        } catch (e) {
          return null;
        }
      }
}