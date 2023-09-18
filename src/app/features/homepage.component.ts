import { Component } from '@angular/core';

@Component({
  selector: 'gr-homepage',
  template: `

      <div fxLayout="column" id="container" class="container">

          <div fxFlex="100" id="header" class="custom-col" style="height:20px;">
              <h3>Benvenuti nella "Gestione Ricette 1.0"</h3>
          </div>

          <gr-lista-ricette />

          <div fxFlex="100" id="footer" class="custom-col" style="height:20px;">
                <h3>Inserisci una nuova ricetta:</h3>
                <gr-inserisci-ricetta></gr-inserisci-ricetta>
          </div>

      </div>

  `,
  styles: [
  ]
})
export class HomepageComponent {

}
