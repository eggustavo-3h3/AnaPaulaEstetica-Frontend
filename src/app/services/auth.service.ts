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

    private perfilSubject = new BehaviorSubject<string | null>(null);

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

                    var dadosLogin = this.decodeJwtPayload(response);
                    this.setPerfil(dadosLogin.perfil);

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
        this.router.navigate(['/login']);
    }

    isAuthenticated(): boolean{
        return !!this.tokenSubject.value;
    }

    getAutheHeaders(){
        return new HttpHeaders({
            'Authorization':`Bearer ${this.token}`
        });
    }

    setPerfil(perfil: string) {
        this.perfilSubject.next(perfil);
    }

    getPerfil$() {
        return this.perfilSubject.asObservable(); // para usar no HTML
    }  

    isAdmin$() {
        return this.perfilSubject.asObservable().pipe(
            map(perfil => perfil === 'Administrador')
        );                
    }

    isAdmix(): boolean {
        const token = localStorage.getItem('token');
        if (!token) {
            return false;
        }

        var dadosLogin = this.decodeJwtPayload(token);
        if (dadosLogin.perfil == 'Administrador') {
            return true;
        }
        return false;
    }

    decodeJwtPayload(token: string): any {
        try {
          const payload = token.split('.')[1];
          console.log('PAYLOAD -> ', payload);
          return JSON.parse(atob(payload));
        } catch (e) {
          return null;
        }
      }
}