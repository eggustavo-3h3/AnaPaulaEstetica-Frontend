import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment.development";

@Injectable({
   providedIn : 'root'
})
export class HorarioService {
    private baseUrl = environment.apiUrl;
    
    constructor(private http : HttpClient) {}

    listarHorariosDisponiveis(dataBase: string) {
        return this.http.get<any[]>(`${this.baseUrl}/agendamento/horarios-disponiveis?dataBase=${dataBase}`);
    }
}