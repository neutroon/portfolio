import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {
  NotificationService,
  Notification,
} from '../../services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-custom-notification',
  standalone: true,
  imports: [CommonModule, ButtonModule, ToastModule],
  providers: [MessageService],
  template: `
    <p-toast
      position="top-right"
      [baseZIndex]="5000"
      [showTransitionOptions]="'300ms'"
      [hideTransitionOptions]="'300ms'"
      [showTransformOptions]="'translateY(-100%)'"
      [hideTransformOptions]="'translateY(-100%)'"
      [style]="{ width: '400px' }"
    ></p-toast>

    <div class="notification-container" *ngIf="notifications.length > 0">
      <div
        *ngFor="let notification of notifications"
        class="notification"
        [ngClass]="notification.type"
      >
        <div class="notification-content">
          <h3 class="notification-title">{{ notification.title }}</h3>
          <p class="notification-message">{{ notification.message }}</p>
          <div class="notification-actions" *ngIf="notification.action">
            <button
              pButton
              [label]="notification.action.label"
              class="p-button-rounded"
              (click)="handleAction(notification.action)"
            ></button>
          </div>
        </div>
        <button class="close-button" (click)="removeNotification(notification)">
          <i class="pi pi-times"></i>
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        position: fixed;
        top: 0;
        right: 0;
        z-index: 9999;
      }

      .notification-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: 400px;
        pointer-events: auto;
      }

      .notification {
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.95) 0%,
          rgba(255, 255, 255, 0.98) 100%
        );
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(220, 39, 67, 0.1);
        backdrop-filter: blur(10px);
        padding: 16px;
        position: relative;
        animation: slideIn 0.3s ease-out;
        overflow: hidden;
        pointer-events: auto;

        &.success {
          border-left: 4px solid #4caf50;
        }

        &.info {
          border-left: 4px solid #2196f3;
        }

        &.warn {
          border-left: 4px solid #ffc107;
        }

        &.error {
          border-left: 4px solid #f44336;
        }
      }

      .notification-content {
        .notification-title {
          color: #333;
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 8px;
          background: linear-gradient(45deg, #f09433, #dc2743);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .notification-message {
          color: #666;
          font-size: 14px;
          line-height: 1.4;
          margin-bottom: 12px;
        }

        .notification-actions {
          display: flex;
          gap: 8px;

          .p-button {
            background: linear-gradient(45deg, #f09433, #dc2743);
            border: none;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;

            &:hover {
              transform: translateY(-1px);
              box-shadow: 0 4px 12px rgba(220, 39, 67, 0.2);
            }
          }
        }
      }

      .close-button {
        position: absolute;
        top: 8px;
        right: 8px;
        background: none;
        border: none;
        color: #666;
        cursor: pointer;
        padding: 4px;
        border-radius: 50%;
        transition: all 0.2s ease;
        pointer-events: auto;

        &:hover {
          background: rgba(0, 0, 0, 0.05);
          color: #333;
        }

        i {
          font-size: 14px;
        }
      }

      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      @media screen and (max-width: 768px) {
        .notification-container {
          left: 20px;
          right: 20px;
          max-width: none;
        }
      }
    `,
  ],
})
export class CustomNotificationComponent implements OnDestroy {
  notifications: Notification[] = [];
  private subscription: Subscription;

  constructor(
    private notificationService: NotificationService,
    private messageService: MessageService
  ) {
    console.log('CustomNotificationComponent constructor called');
    this.subscription = this.notificationService.notifications$.subscribe(
      (notifications) => {
        this.notifications = notifications;
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  handleAction(action: { label: string; url: string }) {
    if (action.url === '#') {
      // Handle follow action
    } else {
      // Open dashboard in new tab
      window.open(action.url, '_blank');
    }
  }

  removeNotification(notification: Notification) {
    this.messageService.clear();
    const currentNotifications = this.notifications.filter(
      (n) => n !== notification
    );
    this.notificationService['notificationsSubject'].next(currentNotifications);
  }
}
