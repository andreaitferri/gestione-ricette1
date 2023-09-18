import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateit'
})
export class DateItPipe implements PipeTransform {
    
  private giorni = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
  private mesi = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
  
  transform(value: Date | string): string {
    if (!value) return '';

    const date = new Date(value);
    const giorno = this.giorni[date.getDay()];
    const mese = this.mesi[date.getMonth()];
    return `${giorno}, ${date.getDate()} ${mese} ${date.getFullYear()}`;
  }
}


