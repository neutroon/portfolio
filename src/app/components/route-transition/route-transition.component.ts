import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-route-transition',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="route-container"
      [@routeAnimations]="animationState"
      (touchstart)="onTouchStart($event)"
      (touchmove)="onTouchMove($event)"
      (touchend)="onTouchEnd()"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      .route-container {
        position: relative;
        width: 100%;
        height: 100%;
      }
    `,
  ],
  animations: [
    trigger('routeAnimations', [
      state(
        'void',
        style({
          position: 'absolute',
          width: '100%',
          transform: 'translateX(100%)',
        })
      ),
      state(
        '*',
        style({
          position: 'absolute',
          width: '100%',
          transform: 'translateX(0)',
        })
      ),
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],
})
export class RouteTransitionComponent implements OnInit, OnDestroy {
  animationState = '';
  private touchStartX = 0;
  private touchEndX = 0;
  private minSwipeDistance = 50;
  private routeSubscription: Subscription;
  private routeOrder = ['profile', 'projects', 'skills', 'experience'];

  constructor(private router: Router) {
    this.routeSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.animationState =
          event.urlAfterRedirects.split('/')[1] || 'profile';
      });
  }

  ngOnInit() {
    // Initialize animation state based on current route
    const currentRoute = this.router.url.split('/')[1] || 'profile';
    this.animationState = currentRoute;
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
  }

  onTouchMove(event: TouchEvent) {
    this.touchEndX = event.touches[0].clientX;
  }

  onTouchEnd() {
    const swipeDistance = this.touchEndX - this.touchStartX;
    const currentRouteIndex = this.routeOrder.indexOf(this.animationState);

    if (Math.abs(swipeDistance) > this.minSwipeDistance) {
      if (swipeDistance > 0 && currentRouteIndex > 0) {
        // Swipe right - go to previous route
        this.router.navigate([this.routeOrder[currentRouteIndex - 1]]);
      } else if (
        swipeDistance < 0 &&
        currentRouteIndex < this.routeOrder.length - 1
      ) {
        // Swipe left - go to next route
        this.router.navigate([this.routeOrder[currentRouteIndex + 1]]);
      }
    }
  }
}
