import { Component } from '@angular/core';

@Component({
  selector: 'gr-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'gestione-ricette';
}
