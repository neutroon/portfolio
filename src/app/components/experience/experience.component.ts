import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';
import { ExperienceService } from '../../services/experience.service';
import { Experience } from '../../interfaces/experience.interface';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
  state,
} from '@angular/animations';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    TooltipModule,
    DividerModule,
  ],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '0.5s cubic-bezier(0.35, 0, 0.25, 1)',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
    trigger('staggerIn', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(20px)' }),
            stagger('100ms', [
              animate(
                '0.5s cubic-bezier(0.35, 0, 0.25, 1)',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
    trigger('scaleIn', [
      state('void', style({ transform: 'scale(0.8)', opacity: 0 })),
      transition(':enter', [
        animate(
          '0.3s cubic-bezier(0.35, 0, 0.25, 1)',
          style({ transform: 'scale(1)', opacity: 1 })
        ),
      ]),
    ]),
    trigger('slideIn', [
      state('void', style({ transform: 'translateX(-20px)', opacity: 0 })),
      transition(':enter', [
        animate(
          '0.3s cubic-bezier(0.35, 0, 0.25, 1)',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),
    ]),
  ],
})
export class ExperienceComponent implements OnInit {
  experiences: Experience[] = [];
  loading: boolean = true;
  error: string | null = null;
  hoveredCard: string | null = null;

  constructor(private experienceService: ExperienceService) {}

  ngOnInit() {
    this.loadExperiences();
  }

  private loadExperiences() {
    this.loading = true;
    this.error = null;

    this.experienceService
      .getExperiences()
      .pipe(
        catchError((error) => {
          this.error = 'Failed to load experiences. Please try again later.';
          console.error('Error loading experiences:', error);
          return of([]);
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((experiences) => {
        this.experiences = experiences;
      });
  }

  formatDate(date: string): string {
    if (date === 'Present') return date;
    const [year, month] = date.split('-');
    return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString(
      'en-US',
      {
        month: 'long',
        year: 'numeric',
      }
    );
  }

  retryLoading() {
    this.loadExperiences();
  }

  onCardHover(expId: string) {
    this.hoveredCard = expId;
  }

  onCardLeave() {
    this.hoveredCard = null;
  }
}
