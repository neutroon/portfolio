import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { ProfileNavComponent } from './components/profile-nav/profile-nav.component';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { BookingButtonComponent } from './components/booking-button/booking-button.component';
import { RouteTransitionComponent } from './components/route-transition/route-transition.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    ProfileNavComponent,
    BookingButtonComponent,
    RouteTransitionComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private _TranslateService: TranslateService) {}

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

    this._TranslateService.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log('lang changed to ' + event.lang);
    });
  }
}
