import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { ProjectService, Project } from '../../services/project.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    ProgressSpinnerModule,
    MessageModule,
  ],
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {
  currentProjectIndex = 0;
  projects: Project[] = [];
  loading = true;
  error: string | null = null;
  private subscriptions: Subscription[] = [];
  private isScrolling = false;
  private scrollTimeout: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) {}

  @HostListener('wheel', ['$event'])
  onScroll(event: WheelEvent) {
    event.preventDefault();
    if (this.isScrolling) return;

    if (event.deltaY > 0) {
      this.scrollToNextProject();
    } else {
      this.scrollToPreviousProject();
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.isScrolling) return;

    switch (event.key) {
      case 'ArrowDown':
        this.scrollToNextProject();
        break;
      case 'ArrowUp':
        this.scrollToPreviousProject();
        break;
      case 'Escape':
        this.closeProject();
        break;
    }
  }

  scrollToNextProject() {
    if (
      this.currentProjectIndex < this.projects.length - 1 &&
      !this.isScrolling
    ) {
      this.currentProjectIndex++;
      this.scrollToProject(this.currentProjectIndex);
      this.updateRoute();
    }
  }

  scrollToPreviousProject() {
    if (this.currentProjectIndex > 0 && !this.isScrolling) {
      this.currentProjectIndex--;
      this.scrollToProject(this.currentProjectIndex);
      this.updateRoute();
    }
  }

  scrollToProject(index: number) {
    if (this.isScrolling) return;

    this.isScrolling = true;
    const projectElement = document.getElementById(`project-${index}`);
    if (projectElement) {
      projectElement.scrollIntoView({ behavior: 'smooth' });

      // Clear any existing timeout
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout);
      }

      // Set a timeout to re-enable scrolling after animation completes
      this.scrollTimeout = setTimeout(() => {
        this.isScrolling = false;
      }, 800); // Adjust this value to match your desired scroll duration
    } else {
      this.isScrolling = false;
    }
  }

  updateRoute() {
    const currentProject = this.projects[this.currentProjectIndex];
    this.router.navigate(['/projects', currentProject.id], {
      replaceUrl: true,
    });
  }

  closeProject() {
    this.router.navigate(['/projects'], {
      replaceUrl: true,
    });
  }

  ngOnInit() {
    console.log('should navigate');
    // Get project ID from route and set current project
    const sub = this.route.params.subscribe((params) => {
      const projectId = +params['id'];
      this.loadProject(projectId);
    });
    this.subscriptions.push(sub);
    this.loadAllProjects();
    // Add scroll snap behavior
    document.body.style.overflow = 'hidden';
  }

  loadAllProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
      },
      error: (error) => {
        this.error = 'Failed to load project details. Please try again later.';
        this.loading = false;
        return [];
      },
    });
  }
  loadProject(projectId: number) {
    const sub = this.projectService.getProjectById(projectId).subscribe({
      next: (project) => {
        if (project) {
          // this.projects = [project];
          this.currentProjectIndex = 0;
          this.loading = false;
        } else {
          this.error = 'Project not found';
          this.loading = false;
        }
      },
      error: (error) => {
        this.error = 'Failed to load project details. Please try again later.';
        this.loading = false;
      },
    });
    this.subscriptions.push(sub);
  }

  retryLoading() {
    this.error = null;
    const projectId = +this.route.snapshot.params['id'];
    this.loadProject(projectId);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    document.body.style.overflow = '';
  }
}
