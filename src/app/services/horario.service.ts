import { Injectable } from "@angular/core";
import { API_BASE_URL } from "../resources/util";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
   providedIn : 'root'
})

export class HorarioService{
    private urlBase = API_BASE_URL;

    constructor(private http : HttpClient) {}

    listarHorariosPorData(data: string): Observable<any> {
        return this.http.get<any[]>(`${this.urlBase}/agendamento/horarios-disponiveis?dataBase=${data}`);
    }

}