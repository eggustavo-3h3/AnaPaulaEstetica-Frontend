import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_BASE_URL } from "../resources/util";

@Injectable({
   providedIn : 'root'
})
export class HorarioService {
    constructor(private http : HttpClient) {}

    listarHorariosDisponiveis(dataBase: string) {
        return this.http.get<any[]>(`${API_BASE_URL}/agendamento/horarios-disponiveis?dataBase=${dataBase}`);
    }
}