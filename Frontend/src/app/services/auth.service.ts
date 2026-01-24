import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BaseUrl = 'http://localhost/GestionFacture/Backend/api'; // change if needed

  constructor(private http: HttpClient) {}

  isLoggedIn(): Observable<boolean> {
    return this.http.get<{ loggedIn: boolean }>(`${this.BaseUrl}/me.php`, { withCredentials: true })
      .pipe(
        map(res => res.loggedIn === true),
        catchError(() => of(false)) // if 401 or error → return false
      );
  }
  logout(): Observable<any> {
  return this.http.post(`${this.BaseUrl}/logout.php`, {}, { withCredentials: true });
}

}
