import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, RouterModule],
  template: `
    <app-navbar></app-navbar>
    <div style="display: flex;">
      <div style="flex: 1;">
        <router-outlet></router-outlet>
      </div>
    </div>
    <footer>
      MyGameTrack © 2025
    </footer>
  `
})
export class AppComponent {}
