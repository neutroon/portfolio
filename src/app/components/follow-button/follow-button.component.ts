import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { FollowService } from '../../services/follow.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-follow-button',
  standalone: true,
  imports: [CommonModule, ButtonModule, TooltipModule],
  template: `
    <button
      pButton
      [class]="isFollowing ? 'p-button-outlined' : 'p-button-primary'"
      [icon]="isFollowing ? 'pi pi-check' : 'pi pi-plus'"
      [label]="isFollowing ? 'Following' : 'Follow'"
      (click)="toggleFollow()"
      pTooltip="Get notified about my latest updates"
      tooltipPosition="bottom"
    ></button>
  `,
  styles: [
    `
      :host ::ng-deep {
        .p-button-primary {
          border-color: transparent;
          background: linear-gradient(
            45deg,
            #f09433 0%,
            #e6683c 25%,
            #dc2743 50%,
            #cc2366 75%,
            #bc1888 100%
          );
        }
        .p-button {
          border-radius: 2rem;
          padding: 0.5rem 1.5rem;
          transition: all 0.3s ease;

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }

          &.p-button-outlined {
            color: #dc2743;
            &:hover {
              color: white;
              background: linear-gradient(
                45deg,
                #f09433 0%,
                #e6683c 25%,
                #dc2743 50%,
                #cc2366 75%,
                #bc1888 100%
              );
            }
          }
        }
      }
    `,
  ],
})
export class FollowButtonComponent implements OnInit, OnDestroy {
  isFollowing = false;
  private subscriptions: Subscription[] = [];

  constructor(private followService: FollowService) {}

  ngOnInit() {
    const sub = this.followService.isFollowing$.subscribe(
      (isFollowing) => (this.isFollowing = isFollowing)
    );
    this.subscriptions.push(sub);
  }

  async toggleFollow() {
    await this.followService.toggleFollow();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
