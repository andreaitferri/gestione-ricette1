import { Ingrediente } from "./ingrediente.model";

export interface Ricetta {
    id: number;
    titolo: string;
    descrizione: string;
    ingredienti: Ingrediente[];
    dataCreazione: Date;
}
