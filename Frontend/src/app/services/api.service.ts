import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BaseUrl = 'http://localhost/GestionFacture/Backend/api';
  constructor(private http: HttpClient) {}

    login(email: string, mdp: string): Observable<any> {
    return this.http.post<any>(`${this.BaseUrl}/login.php`, { email, mdp });
    }
    getFactures(): Observable<any> {
    return this.http.get<any>(`${this.BaseUrl}/factures.php`);
    }
    getClients(): Observable<any> {
    return this.http.get<any>(`${this.BaseUrl}/clients.php`);
    }


}
