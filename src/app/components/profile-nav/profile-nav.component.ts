import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FollowButtonComponent } from '../follow-button/follow-button.component';
@Component({
  selector: 'profile-nav',
  standalone: true,
  imports: [RouterModule, ButtonModule, FollowButtonComponent],

  templateUrl: './profile-nav.component.html',
  styleUrl: './profile-nav.component.scss',
})
export class ProfileNavComponent {
  onFollowClick(): void {
    // Implement follow functionality
    console.log('Follow button clicked');
  }
}
