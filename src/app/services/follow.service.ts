import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface NotificationOptions {
  body: string;
  icon: string;
  badge: string;
  silent: boolean;
  requireInteraction: boolean;
  tag: string;
  timestamp?: number;
}

@Injectable({
  providedIn: 'root',
})
export class FollowService {
  private readonly STORAGE_KEY = 'portfolio_followers';
  // Use absolute path for Chrome compatibility
  private readonly ICON_PATH =
    window.location.origin + '/assets/icons/notification-icon.png';
  private isFollowingSubject = new BehaviorSubject<boolean>(false);
  private notificationPermissionSubject = new BehaviorSubject<boolean>(false);

  isFollowing$ = this.isFollowingSubject.asObservable();
  notificationPermission$ = this.notificationPermissionSubject.asObservable();

  constructor() {
    this.checkFollowStatus();
    this.checkNotificationPermission();
    this.preloadNotificationIcon();
  }

  private async preloadNotificationIcon(): Promise<void> {
    try {
      console.log('Preloading notification icon from:', this.ICON_PATH);
      const response = await fetch(this.ICON_PATH);
      if (!response.ok) {
        console.error('Failed to load notification icon:', response.statusText);
      } else {
        console.log('Notification icon loaded successfully');
      }
    } catch (error) {
      console.error('Error preloading notification icon:', error);
    }
  }

  private checkFollowStatus(): void {
    const isFollowing = localStorage.getItem(this.STORAGE_KEY) === 'true';
    this.isFollowingSubject.next(isFollowing);
  }

  private checkNotificationPermission(): void {
    if ('Notification' in window) {
      const permission = Notification.permission;
      console.log('Current notification permission:', permission);
      this.notificationPermissionSubject.next(permission === 'granted');
    }
  }

  private isChrome(): boolean {
    return (
      /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
    );
  }

  async toggleFollow(): Promise<void> {
    const currentStatus = this.isFollowingSubject.value;
    const newStatus = !currentStatus;

    if (newStatus) {
      console.log('Requesting notification permission...');
      const permission = await this.requestNotificationPermission();
      console.log('Permission result:', permission);

      if (permission === 'granted') {
        this.notificationPermissionSubject.next(true);
        await this.showWelcomeNotification();
      }
    }

    localStorage.setItem(this.STORAGE_KEY, newStatus.toString());
    this.isFollowingSubject.next(newStatus);
  }

  private async requestNotificationPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      console.log('Notifications not supported in this browser');
      return 'denied';
    }

    try {
      const permission = await Notification.requestPermission();
      console.log('Notification permission requested:', permission);
      return permission;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return 'denied';
    }
  }

  private showWelcomeNotification() {
    this.notificationPermission$.subscribe((permission) => {
      if (permission) {
        try {
          const notification = new Notification('Welcome to My Portfolio!', {
            body: "Thank you for following me. You'll receive updates about my latest projects and achievements.",
            icon: this.ICON_PATH,
            badge: this.ICON_PATH,
            tag: 'welcome',
            requireInteraction: true,
            silent: false,
            data: {
              url: window.location.href,
            },
          });

          // Add custom styling through CSS
          const style = document.createElement('style');
          style.textContent = `
            .notification {
              background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%);
              border-radius: 12px;
              box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
              border: 1px solid rgba(220, 39, 67, 0.1);
              backdrop-filter: blur(10px);
              padding: 16px;
              margin: 8px;
              max-width: 400px;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            }

            .notification-title {
              color: #333;
              font-size: 16px;
              font-weight: 600;
              margin-bottom: 8px;
              background: linear-gradient(45deg, #f09433, #dc2743);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }

            .notification-body {
              color: #666;
              font-size: 14px;
              line-height: 1.4;
            }

            .notification-actions {
              margin-top: 12px;
              display: flex;
              gap: 8px;
            }

            .notification-button {
              background: linear-gradient(45deg, #f09433, #dc2743);
              color: white;
              border: none;
              padding: 8px 16px;
              border-radius: 20px;
              font-size: 14px;
              font-weight: 500;
              cursor: pointer;
              transition: all 0.2s ease;
            }

            .notification-button:hover {
              transform: translateY(-1px);
              box-shadow: 0 4px 12px rgba(220, 39, 67, 0.2);
            }
          `;
          document.head.appendChild(style);

          notification.onclick = () => {
            window.focus();
            notification.close();
          };
        } catch (error) {
          console.error('Error showing welcome notification:', error);
        }
      }
    });
  }

  public sendUpdateNotification(update: string) {
    this.notificationPermission$.subscribe((permission) => {
      if (permission) {
        try {
          const notification = new Notification('Portfolio Update', {
            body: update,
            icon: this.ICON_PATH,
            badge: this.ICON_PATH,
            tag: 'update',
            requireInteraction: true,
            silent: false,
            data: {
              url: window.location.href,
            },
          });

          notification.onclick = () => {
            window.focus();
            notification.close();
          };
        } catch (error) {
          console.error('Error sending update notification:', error);
        }
      }
    });
  }
}
