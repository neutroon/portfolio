import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  title: string;
  message: string;
  type: 'info' | 'success' | 'warn' | 'error';
  action?: {
    label: string;
    url: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  notifications$ = this.notificationsSubject.asObservable();

  constructor(private messageService: MessageService) {}

  showDashboardNotification() {
    const notification: Notification = {
      title: 'Explore My Dashboard!',
      message:
        'Want to see more insights and analytics? Check out my interactive dashboard for detailed statistics and updates.',
      type: 'info',
      action: {
        label: 'View Dashboard',
        url: 'http://localhost:4200/dashboard',
      },
    };

    this.showNotification(notification);
  }

  showWelcomeNotification() {
    const notification: Notification = {
      title: 'Welcome to My Portfolio!',
      message:
        "Thank you for visiting my portfolio. You'll receive updates about my latest projects and achievements.",
      type: 'success',
      action: {
        label: 'Follow Me',
        url: '#',
      },
    };

    this.showNotification(notification);
  }

  private showNotification(notification: Notification) {
    // Add to PrimeNG toast
    this.messageService.add({
      severity: notification.type,
      summary: notification.title,
      detail: notification.message,
      sticky: true,
      life: 10000,
      data: notification.action,
    });

    // Add to our notifications list
    const currentNotifications = this.notificationsSubject.value;
    this.notificationsSubject.next([...currentNotifications, notification]);
  }

  clearNotifications() {
    this.messageService.clear();
    this.notificationsSubject.next([]);
  }
}
