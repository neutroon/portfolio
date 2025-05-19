import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-booking-button',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CalendarModule,
    DialogModule,
    FormsModule,
    InputTextModule,
    ToastModule,
  ],
  providers: [MessageService],
  template: `
    <div class="booking-container">
      <button
        pButton
        class="booking-button"
        [class.expanded]="showDialog"
        label="{{ showDialog ? 'Close' : 'Schedule a Meeting' }}"
        icon="{{ showDialog ? 'pi pi-times' : 'pi pi-calendar' }}"
        (click)="toggleBookingDialog()"
      ></button>

      <div class="booking-dialog" [class.show]="showDialog">
        <div class="dialog-content">
          <h2>Schedule a Meeting</h2>

          <div class="calendar-container" *ngIf="!bookingData.date">
            <p-calendar
              [(ngModel)]="bookingData.date"
              [showTime]="true"
              [showButtonBar]="true"
              [minDate]="minDate"
              [maxDate]="maxDate"
              hourFormat="24"
              [stepMinute]="30"
              placeholder="Select date and time"
              [showIcon]="true"
              [inline]="true"
              [touchUI]="true"
              class="custom-calendar"
              (onSelect)="onDateSelect()"
            ></p-calendar>
          </div>

          <div class="form-container" *ngIf="bookingData.date">
            <div class="selected-date">
              <span class="date-label">Selected Date & Time:</span>
              <span class="date-value">{{
                bookingData.date | date : 'medium'
              }}</span>
              <button
                pButton
                class="p-button-text p-button-rounded"
                icon="pi pi-pencil"
                (click)="resetDate()"
              ></button>
            </div>

            <div class="field">
              <input
                type="text"
                pInputText
                [(ngModel)]="bookingData.name"
                placeholder="Your Name"
              />
            </div>

            <div class="field">
              <input
                type="email"
                pInputText
                [(ngModel)]="bookingData.email"
                placeholder="Your Email"
              />
            </div>

            <div class="field">
              <textarea
                pInputTextarea
                [(ngModel)]="bookingData.notes"
                [rows]="2"
                placeholder="Any specific topics you'd like to discuss?"
              ></textarea>
            </div>

            <button
              pButton
              label="Confirm Booking"
              icon="pi pi-check"
              (click)="submitBooking()"
              [disabled]="!isFormValid()"
              class="confirm-button"
            ></button>
          </div>
        </div>
      </div>

      <p-toast></p-toast>
    </div>
  `,
  styles: [
    `
      ::ng-deep
        .booking-dialog
        .calendar-container
        .custom-calendar
        .p-datepicker {
        transform: translate(-50%, -46%) !important;
      }
      .booking-container {
        position: relative;
      }

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
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        will-change: transform, box-shadow, width;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        }

        &.expanded {
          border-radius: 1rem;
          background: #dc2743;
        }

        i {
          margin-right: 0.5rem;
        }
      }

      .booking-dialog {
        position: fixed;
        bottom: 5rem;
        right: 2rem;
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.95) 0%,
          rgba(255, 255, 255, 0.98) 100%
        );
        border-radius: 1rem;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        width: 0;
        height: 0;
        opacity: 0;
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 999;
        border: 1px solid rgba(220, 39, 67, 0.1);
        backdrop-filter: blur(10px);

        &.show {
          width: 320px;
          min-height: 520px;
          height: auto;
          max-height: 1040px;
          opacity: 1;
          padding: 1rem;
          overflow-y: auto;
        }

        .dialog-content {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 1rem;

          h2 {
            margin: 0;
            color: #333;
            font-size: 1.2rem;
            font-weight: 600;
            text-align: center;
            background: linear-gradient(45deg, #f09433, #dc2743);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }

        .calendar-container {
          position: relative;
          z-index: 2;
          margin-bottom: 1rem;
          min-height: 320px;

          ::ng-deep .custom-calendar {
            .p-calendar {
              width: 100%;
            }

            .p-datepicker {
              border: none;
              box-shadow: none;
              padding: 0;
              background: transparent;
              width: 100%;
              min-width: auto;
              min-height: 300px;
            }

            .p-datepicker-header {
              border: none;
              padding: 0.5rem 0;
              background: transparent;
              font-size: 0.9rem;
            }

            .p-datepicker-calendar {
              width: 100%;
              font-size: 0.85rem;
              margin-bottom: 0.5rem;

              th {
                padding: 0.3rem;
                font-weight: 500;
                color: #666;
              }

              td {
                padding: 0.3rem;
                width: 14.28%;

                > span {
                  width: 2rem;
                  height: 2rem;
                  line-height: 2rem;
                  border-radius: 50%;
                  margin: 0 auto;
                }
              }

              .p-datepicker-today > span {
                background: linear-gradient(45deg, #f09433, #dc2743);
                color: white;
              }

              .p-highlight {
                background: linear-gradient(45deg, #f09433, #dc2743);
                color: white;
              }
            }

            .p-timepicker {
              padding: 0.8rem 0;
              font-size: 0.9rem;
              border-top: 1px solid rgba(220, 39, 67, 0.1);
              margin-top: 0.5rem;

              .p-separator {
                margin: 0 0.2rem;
              }

              span {
                padding: 0.2rem;
              }

              button {
                width: 1.8rem;
                height: 1.8rem;
                font-size: 0.8rem;
              }
            }

            .p-button-bar {
              padding: 0.8rem 0;
              font-size: 0.9rem;
              border-top: 1px solid rgba(220, 39, 67, 0.1);
              margin-top: 0.5rem;

              button {
                padding: 0.4rem 1rem;
                font-size: 0.85rem;
              }
            }
          }
        }

        .form-container {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          background: white;
          padding: 1rem;
          border-radius: 0.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

          .selected-date {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem;
            background: rgba(220, 39, 67, 0.05);
            border-radius: 0.5rem;
            margin-bottom: 0.5rem;

            .date-label {
              font-size: 0.85rem;
              color: #666;
            }

            .date-value {
              font-size: 0.9rem;
              font-weight: 500;
              color: #333;
            }

            .p-button {
              padding: 0.3rem;
              margin-left: auto;

              &:hover {
                background: rgba(220, 39, 67, 0.1);
              }
            }
          }

          .field {
            input,
            textarea {
              width: 100%;
              padding: 0.6rem;
              border: 1px solid rgba(220, 39, 67, 0.2);
              border-radius: 0.5rem;
              transition: all 0.2s ease;
              background: rgba(255, 255, 255, 0.9);
              font-size: 0.9rem;

              &:focus {
                outline: none;
                border-color: #dc2743;
                box-shadow: 0 0 0 2px rgba(220, 39, 67, 0.1);
              }
            }
          }

          .confirm-button {
            background: linear-gradient(45deg, #f09433, #dc2743);
            border: none;
            color: white;
            padding: 0.6rem;
            border-radius: 0.5rem;
            font-weight: 500;
            transition: all 0.2s ease;
            font-size: 0.9rem;

            &:hover:not(:disabled) {
              transform: translateY(-1px);
              box-shadow: 0 4px 12px rgba(220, 39, 67, 0.2);
            }

            &:disabled {
              background: #ccc;
              cursor: not-allowed;
            }
          }
        }
      }

      @media screen and (max-width: 768px) {
        .booking-button {
          bottom: 1rem;
          right: 1rem;
          padding: 0.8rem 1.5rem;
          font-size: 1rem;
        }

        .booking-dialog {
          bottom: 4rem;
          right: 1rem;
          width: 300px !important;

          &.show {
            width: 300px !important;
          }
        }
      }
    `,
  ],
})
export class BookingButtonComponent {
  showDialog = false;
  minDate: Date;
  maxDate: Date;
  bookingData = {
    name: '',
    email: '',
    date: null as Date | null,
    notes: '',
  };

  constructor(private messageService: MessageService) {
    // Set min date to today
    this.minDate = new Date();
    // Set max date to 3 months from now
    this.maxDate = new Date();
    this.maxDate.setMonth(this.maxDate.getMonth() + 3);
  }

  toggleBookingDialog() {
    this.showDialog = !this.showDialog;
    if (!this.showDialog) {
      // Reset form when closing
      this.bookingData = {
        name: '',
        email: '',
        date: null,
        notes: '',
      };
    }
  }

  isFormValid(): boolean {
    return (
      this.bookingData.name.trim() !== '' &&
      this.bookingData.email.trim() !== '' &&
      this.bookingData.date !== null &&
      this.isValidEmail(this.bookingData.email)
    );
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  submitBooking() {
    if (!this.isFormValid()) {
      return;
    }

    // Here you would typically send the booking data to your backend
    console.log('Booking submitted:', this.bookingData);

    // Show success message
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Meeting scheduled successfully! We will contact you shortly.',
    });

    // Reset form and close dialog
    this.bookingData = {
      name: '',
      email: '',
      date: null,
      notes: '',
    };
    this.showDialog = false;
  }

  onDateSelect() {
    // The calendar will be hidden automatically due to *ngIf
    console.log('Date selected:', this.bookingData.date);
  }

  resetDate() {
    this.bookingData.date = null;
  }
}
