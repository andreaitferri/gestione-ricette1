import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ricetta } from 'src/app/interfaces/ricetta.model';
import { RicettaService } from 'src/app/services/ricetta.service';
import { FormsModule, NgModel} from '@angular/forms';

@Component({
  selector: 'gr-lista-ricette',
  template: `

     <div fxLayout="row">

        <div fxFlex="100" fxFlex.gt-sm="22" class="custom-col" style="padding:5px; text-align:center;">
        <h2>Filtra</h2>
        <div class="filter-container">
              <p>Cerca Ricette</p>
              <mat-form-field appearance="outline">
                 <input matInput placeholder="Filtra per titolo o ingredienti" [(ngModel)]="filtro"> 
              </mat-form-field>
            </div>
        </div>

        <div fxFlex="100" fxFlex.gt-sm="88" class="custom-col" style="padding:5px;">
          <h2>Ricette</h2>
          <p>L'elenco delle ricette disponibili</p>
          <div class="ricette-grid">
              <div class="ricetta-container" *ngFor="let ricetta of ricette" 
              [ngStyle]="{'display': isRicettaVisible(ricetta) ? 'block' : 'none'}">

              <mat-card>
                <mat-card-title>{{ ricetta.titolo }}</mat-card-title>
                <mat-card-content>
                  <p>{{ ricetta.descrizione }}</p>
                  <h4>Ingredienti:</h4>
                  <ul>
                    <li *ngFor="let ingrediente of ricetta.ingredienti">
                      {{ ingrediente.nome }} - {{ ingrediente.quantita }}
                    </li>
                  </ul>
                  <p>Data di Creazione: {{ ricetta.dataCreazione | dateit }}</p>
                </mat-card-content>
              </mat-card>
            </div>
            </div>
          </div>

      </div>
  `,
  styles: [`
  
    .ricette-grid {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    .ricetta-container {
      flex: 0 0 48%;
      box-sizing: border-box;
      padding: 10px;
    }

    mat-card {
      width: 100%; 
      padding: 5px; 
      border: 1px solid #ccc; 
      box-shadow: 3px 3px 5px 0px #ccc; 
      transition: box-shadow 0.3s;
    }

    mat-card:hover {
      box-shadow: 5px 5px 8px 0px #ccc; 
    }
   
    `],
      providers: [NgModel],
})
export class ListaRicetteComponent implements OnInit {
  ricette: Ricetta[] = [];
  filtro: string = '';

  constructor(private ricettaService: RicettaService) { 
    this.ricettaService.ricettaAggiunta.subscribe(() => {
      this.loadRicette();
    });
  }

  ngOnInit(): void {
    this.loadRicette();
  }

  loadRicette(): void {
    this.ricettaService.caricaRicette().subscribe(data => {
      this.ricette = data;
    }, error => {
      console.error('Errore durante il caricamento delle ricette:', error);
    });
  }

  isRicettaVisible(ricetta: Ricetta): boolean {
    console.log("[DEBUG] isRicettaVisible");
    const filter = this.filtro.toLowerCase();
    const titolo = ricetta.titolo.toLowerCase();
    const ingredienti = ricetta.ingredienti.map(ingrediente => ingrediente.nome.toLowerCase()).join(' ');

    return !filter || titolo.includes(filter) || ingredienti.includes(filter);
  }
  
}
