import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
  state,
} from '@angular/animations';
import { RouterModule, Router } from '@angular/router';
import { ProjectService, Project } from '../../services/project.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    TooltipModule,
    DividerModule,
    RouterModule,
    ProgressSpinnerModule,
    MessageModule,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
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
  ],
})
export class ProjectsComponent implements OnInit, OnDestroy {
  hoveredProject: number | null = null;
  projects: Project[] = [];
  loading = true;
  error: string | null = null;
  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private projectService: ProjectService) {}

  ngOnInit() {
    this.loadProjects();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  loadProjects() {
    const sub = this.projectService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load projects. Please try again later.';
        this.loading = false;
      },
    });
    this.subscriptions.push(sub);
  }

  openProjectDetails(projectId: number): void {
    this.router.navigate(['/projects', projectId]);
  }

  onProjectHover(projectId: number): void {
    this.hoveredProject = projectId;
  }

  onProjectLeave(): void {
    this.hoveredProject = null;
  }

  getFeaturedCount(): number {
    return this.projects.filter((p) => p.featured).length;
  }

  getTotalTechnologies(): number {
    const uniqueTechs = new Set(this.projects.flatMap((p) => p.technologies));
    return uniqueTechs.size;
  }

  retryLoading() {
    this.error = null;
    this.loadProjects();
  }
}
