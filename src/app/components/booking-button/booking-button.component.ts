import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-booking-button',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <button
      pButton
      class="booking-button"
      label="Schedule a Meeting"
      icon="pi pi-calendar"
      (click)="openBookingLink()"
    ></button>
  `,
  styles: [
    `
      .booking-button {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
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
        padding: 1rem 2rem;
        border-radius: 2rem;
        font-size: 1.1rem;
        font-weight: 500;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        will-change: transform, box-shadow;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        }

        i {
          margin-right: 0.5rem;
        }
      }

      @media screen and (max-width: 768px) {
        .booking-button {
          bottom: 1rem;
          right: 1rem;
          padding: 0.8rem 1.5rem;
          font-size: 1rem;
        }
      }
    `,
  ],
})
export class BookingButtonComponent {
  openBookingLink() {
    // Replace with your actual booking link
    window.open('https://calendly.com/your-username', '_blank');
  }
}
