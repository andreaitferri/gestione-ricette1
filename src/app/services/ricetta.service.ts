import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Ricetta } from 'src/app/interfaces/ricetta.model';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RicettaService {

  private readonly apiUrl = 'http://localhost:3000/ricette';

  constructor(private http: HttpClient) { }
  ricettaAggiunta = new Subject<void>();


  inserisciRicetta(ricetta: Ricetta): Observable<Ricetta> {
    return this.http.post<Ricetta>(this.apiUrl, ricetta).pipe(
      tap((response: Ricetta) => {
        this.ricettaAggiunta.next();
      }),
      catchError((error: any) => throwError(error))  
    );
  }

  caricaRicette(): Observable<Ricetta[]> {
    return this.http.get<Ricetta[]>(this.apiUrl);
  }

}
