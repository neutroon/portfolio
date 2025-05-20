import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { ProfileNavComponent } from './components/profile-nav/profile-nav.component';
import { BookingButtonComponent } from './components/booking-button/booking-button.component';
import { RouteTransitionComponent } from './components/route-transition/route-transition.component';
import { CustomNotificationComponent } from './components/custom-notification/custom-notification.component';
import { NotificationService } from './services/notification.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    ProfileNavComponent,
    BookingButtonComponent,
    RouteTransitionComponent,
    CustomNotificationComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService, NotificationService],
})
export class AppComponent implements OnInit {
  constructor(private notificationService: NotificationService) {}

  blackBackground = [
    'font-size: 38px',
    'background-color: #000',
    'color: #52d273',
    'padding:0.5rem',
    'border: 3px groove #52d273',
  ].join(' ;');

  lastConsole = [
    'background-color: #ffffb4',
    'color: black',
    'padding:0.5rem',
    'border: 3px groove #000dfb',
  ].join(' ;');

  ngOnInit(): void {
    // Show welcome notification immediately
    setTimeout(() => {
      this.notificationService.showWelcomeNotification();
    }, 2000);

    // Show dashboard notification after a delay
    setTimeout(() => {
      this.notificationService.showDashboardNotification();
    }, 8000);

    setTimeout(() => {
      console.log('%c Hello World! 👨‍💻', this.blackBackground);
      console.log(
        "%c I'm %O",
        'background-color: white; color: red; padding: 2px;',
        {
          name: 'Hesham Mansour',
          age: '22',
          occupation: 'Frontend Developer',
        }
      );
      console.log(
        '%c if you found that, you are now lost on the internet. Email me at nbilha161@gmail.com to guide you 👽',
        this.lastConsole
      );
    }, 3000);
  }
}
