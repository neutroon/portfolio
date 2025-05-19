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

  private async showWelcomeNotification(): Promise<void> {
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        console.log('Showing welcome notification...');
        const notificationOptions: NotificationOptions = {
          body: 'You will now receive updates about my latest projects and achievements.',
          icon: this.ICON_PATH,
          badge: this.ICON_PATH,
          silent: false,
          requireInteraction: true,
          tag: 'portfolio-welcome',
        };

        // Add timestamp for Chrome
        if (this.isChrome()) {
          notificationOptions.timestamp = Date.now();
        }

        const notification = new Notification(
          'Welcome to My Portfolio!',
          notificationOptions
        );

        notification.onclick = () => {
          console.log('Welcome notification clicked');
          window.focus();
          notification.close();
        };
      } catch (error) {
        console.error('Error showing welcome notification:', error);
      }
    }
  }

  async sendUpdateNotification(title: string, body: string): Promise<void> {
    console.log('Attempting to send update notification...');
    console.log('Notification permission:', Notification.permission);
    console.log(
      'Is following:',
      localStorage.getItem(this.STORAGE_KEY) === 'true'
    );
    console.log('Browser:', navigator.userAgent);

    if ('Notification' in window && Notification.permission === 'granted') {
      const followers = localStorage.getItem(this.STORAGE_KEY) === 'true';
      if (followers) {
        try {
          console.log('Creating notification with icon:', this.ICON_PATH);
          const notificationOptions: NotificationOptions = {
            body,
            icon: this.ICON_PATH,
            badge: this.ICON_PATH,
            silent: false,
            requireInteraction: true,
            tag: 'portfolio-update',
          };

          // Add timestamp for Chrome
          if (this.isChrome()) {
            notificationOptions.timestamp = Date.now();
          }

          const notification = new Notification(title, notificationOptions);

          notification.onclick = () => {
            console.log('Update notification clicked');
            window.focus();
            notification.close();
          };
        } catch (error) {
          console.error('Error sending update notification:', error);
          throw error;
        }
      } else {
        console.log('User is not following, skipping notification');
      }
    } else {
      console.log('Notifications not permitted or not supported');
    }
  }
}
