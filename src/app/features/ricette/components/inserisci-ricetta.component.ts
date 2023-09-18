import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Ricetta } from 'src/app/interfaces/ricetta.model';
import { RicettaService } from 'src/app/services/ricetta.service';

@Component({
  selector: 'gr-inserisci-ricetta',
  template: `
   <mat-card>
      <form [formGroup]="ricettaForm" >

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Titolo</mat-label>
        <input matInput formControlName="titolo">
        <mat-error *ngIf="ricettaForm.controls['titolo'].hasError('required')">
          Il titolo è obbligatorio.
        </mat-error>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Descrizione</mat-label>
        <textarea matInput formControlName="descrizione"></textarea>
        <mat-error *ngIf="ricettaForm.controls['descrizione'].hasError('required')">
          La descrizione è obbligatoria.
        </mat-error>
      </mat-form-field>

        <div formArrayName="ingredienti">
          <div *ngFor="let ingrediente of ingredienti.controls; let i = index">
            <div [formGroupName]="i">
              <mat-form-field appearance="outline" class="half-width">
                <mat-label>Nome Ingrediente</mat-label>
                <input matInput formControlName="nome">
              </mat-form-field>

              <mat-form-field appearance="outline" class="half-width">
                <mat-label>Quantità</mat-label>
                <input matInput formControlName="quantità">
              </mat-form-field>

              <button mat-button color="warn" (click)="rimuoviIngrediente(i)">Rimuovi</button>
            </div>
          </div>
        </div>

        <button mat-raised-button class="spaced-button" color="primary" (click)="aggiungiIngrediente()">Aggiungi Ingrediente</button>
        <button mat-raised-button class="spaced-button" color="accent" (click)="onSubmit()" *ngIf="ingredienti.length > 0">Inserisci Ricetta</button>
      </form>
    </mat-card>


  `,
  styles: [`
    
    .spaced-button {
    margin-right: 20px;  
      }
     
    .half-width {
      width: 35%;
      margin-bottom: 10px;
     }

    .full-width {
      width: 100%;
      margin-bottom: 10px;
    }
  `]
})
export class InserisciRicettaComponent implements OnInit {
  ricettaForm: FormGroup;

  constructor(private fb: FormBuilder,private ricettaService: RicettaService) {
    this.ricettaForm = this.fb.group({
      titolo: ['',Validators.required],
      descrizione: ['',Validators.required],
      ingredienti: this.fb.array([]),
      dataCreazione: [new Date()]
    });
  }

  ngOnInit(): void {}

  get ingredienti() {
    return this.ricettaForm.get('ingredienti') as FormArray;
  }

  aggiungiIngrediente() {
    const ingredienteGroup = this.fb.group({
      nome: ['', Validators.required],       
      quantità: ['', Validators.required], 
    });
    this.ingredienti.push(ingredienteGroup);
  }

  rimuoviIngrediente(index: number) {
    this.ingredienti.removeAt(index);
  }

  onSubmit() {
    console.log("[DEBUG] onSubmit");
    console.log(this.ricettaForm.value);
  
    const titolo = this.ricettaForm.get('titolo')?.value;
    const descrizione = this.ricettaForm.get('descrizione')?.value;
    const ingredienti = this.ricettaForm.get('ingredienti');
  
    if ((titolo || descrizione) && (!ingredienti || (ingredienti instanceof FormArray && ingredienti.length === 0))) {
      alert("Compila almeno un ingrediente!");
      return;
    }
  
    if (this.ricettaForm.invalid || (ingredienti && ingredienti.hasError('nessunIngrediente'))) {
      alert("Compila tutti i campi obbligatori e assicurati di avere almeno un ingrediente!");
      return;
    }
  
    const nuovaRicetta: Ricetta = this.ricettaForm.value;
  
    this.ricettaService.inserisciRicetta(nuovaRicetta).subscribe(
      response => {
        console.log('Ricetta inserita con successo:', response);
        alert('Ricetta Inserita con successo');
        this.ricettaForm.reset();
        this.ricettaService.caricaRicette();
      },
      error => {
        console.error('Errore durante l\'inserimento della ricetta:', error);
      }
    );
  }
  

}
