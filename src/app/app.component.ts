import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileNavComponent } from './components/profile-nav/profile-nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ProfileNavComponent,

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'myInsta';
}
