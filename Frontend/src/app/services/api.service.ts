import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from '../models/service.model';
import { Facture } from '../models/facture.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BaseUrl = 'http://localhost/GestionFacture/Backend/api';
  constructor(private http: HttpClient) {}

    login(email: string, mdp: string): Observable<any> {
        return this.http.post<any>(`${this.BaseUrl}/login.php`,{ email, mdp },{ withCredentials: true });}
        
    getFactures(): Observable<any> {
    return this.http.get<any>(`${this.BaseUrl}/factures.php`);
    }
    getClients(): Observable<any> {
    return this.http.get<any>(`${this.BaseUrl}/clients.php`);
    }

    getServices(id:String): Observable<any> {
      return this.http.post<any>(`${this.BaseUrl}/services.php`, { id})
    }
    getTotalAmount(id:String): Observable<any> {
      return this.http.post<any>(`${this.BaseUrl}/totalAmount.php`, { id})
    }
    addService(service: Service): Observable<any> {
      return this.http.post<any>(`${this.BaseUrl}/addService.php`, { service });
    }
    editService(service:Service): Observable<any>{
      return this.http.post<any>(`${this.BaseUrl}/editService.php`, { service})
    }
    supprimerService(service:Service): Observable<any>{
      return this.http.post<any>(`${this.BaseUrl}/supprimerService.php`, { service})
    }
    getClientName(id:String): Observable<any> {
      return this.http.post<any>(`${this.BaseUrl}/ClientName.php`, { id})
    }
    addFacture(facture: Facture): Observable<any> {
      return this.http.post<any>(`${this.BaseUrl}/addFacture.php`, { facture });
    }
    supprimerFacture(facture:Facture): Observable<any>{
      return this.http.post<any>(`${this.BaseUrl}/supprimerFacture.php`, { facture})
    }
    editFacture(facture: Facture): Observable<any> {
      return this.http.post<any>(`${this.BaseUrl}/editFacture.php`, { facture });
    }

}
