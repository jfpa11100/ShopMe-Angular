import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: ` <router-outlet /> `,
  styles: `
    @media screen and (max-width: 650px) {
    }
  `,
})
export class AppComponent {}
