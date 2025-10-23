import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
  <main class="container">
    <router-outlet></router-outlet>
  </main>
  `
})
export class AppComponent {}
