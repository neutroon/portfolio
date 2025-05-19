import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FollowService } from '../../services/follow.service';

@Component({
  selector: 'app-notification-test',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <div class="notification-test">
      <button
        pButton
        label="Test Notification"
        icon="pi pi-bell"
        (click)="sendTestNotification()"
        class="p-button-rounded p-button-outlined"
        [disabled]="!hasPermission"
      ></button>
      <small *ngIf="!hasPermission" class="permission-warning">
        Please enable notifications to test
      </small>
      <small *ngIf="errorMessage" class="error-message">
        {{ errorMessage }}
      </small>
    </div>
  `,
  styles: [
    `
      .notification-test {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        padding: 1rem;

        .p-button {
          background: linear-gradient(
            45deg,
            #f09433 0%,
            #e6683c 25%,
            #dc2743 50%,
            #cc2366 75%,
            #bc1888 100%
          );
          border: none;
          color: white;
          transition: all 0.3s ease;

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }

          &:disabled {
            background: #ccc;
            transform: none;
            box-shadow: none;
          }
        }

        .permission-warning,
        .error-message {
          color: #dc2743;
          font-size: 0.8rem;
        }
      }
    `,
  ],
})
export class NotificationTestComponent {
  hasPermission = false;
  errorMessage: string | null = null;

  constructor(private followService: FollowService) {
    this.checkPermission();
  }

  private async checkPermission() {
    if ('Notification' in window) {
      this.hasPermission = Notification.permission === 'granted';
      console.log('Notification permission status:', Notification.permission);
    } else {
      console.log('Notifications not supported in this browser');
    }
  }

  async sendTestNotification() {
    this.errorMessage = null;

    try {
      // First, try direct notification
      if ('Notification' in window && Notification.permission === 'granted') {
        console.log('Attempting to send direct notification...');
        const notification = new Notification('Direct Test', {
          body: 'This is a direct test notification',
          icon: 'assets/icons/notification-icon.png',
        });
        console.log('Direct notification sent successfully');
      }

      // Then try through the service
      console.log('Attempting to send notification through service...');
      await this.followService.sendUpdateNotification(
        'Test Notification',
        'This is a test notification to verify the icon and functionality.'
      );
      console.log('Service notification sent successfully');
    } catch (error) {
      console.error('Error sending test notification:', error);
      this.errorMessage =
        'Failed to send notification. Check console for details.';
    }
  }
}
