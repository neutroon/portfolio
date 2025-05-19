import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowButtonComponent } from '../follow-button/follow-button.component';
import { NotificationTestComponent } from '../notification-test/notification-test.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FollowButtonComponent, NotificationTestComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  onFollowClick() {
    // Handle follow button click
    console.log('Follow button clicked');
  }
}
