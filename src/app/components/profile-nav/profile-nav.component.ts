import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'profile-nav',
  standalone: true,
  imports: [RouterModule, ButtonModule],

  templateUrl: './profile-nav.component.html',
  styleUrl: './profile-nav.component.scss',
})
export class ProfileNavComponent {
  onFollowClick(): void {
    // Implement follow functionality
    console.log('Follow button clicked');
  }
}
