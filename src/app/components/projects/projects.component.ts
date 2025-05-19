import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';
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

interface Project {
  id: number;
  title: string;
  description: string;
  images: string[];
  technologies: string[];
  demoLink: string;
  sourceLink: string;
  featured?: boolean;
  likes?: number;
  comments?: number;
}

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
export class ProjectsComponent {
  hoveredProject: number | null = null;
  projects: Project[] = [
    {
      id: 1,
      title: 'Project 1',
      description: 'Description of project 1',
      images: [
        'https://99designs-blog.imgix.net/blog/wp-content/uploads/2021/01/abstract-website-copy.jpg?auto=format&q=60&fit=max&w=930',
      ],
      technologies: ['Angular', 'TypeScript', 'SCSS'],
      demoLink: 'https://demo1.com',
      sourceLink: 'https://github.com/project1',
      featured: true,
      likes: 120,
      comments: 15,
    },
    {
      id: 2,
      title: 'Project 2',
      description: 'Description of project 2',
      images: [
        'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210401151214/What-is-Website.png',
      ],
      technologies: ['React', 'Node.js', 'MongoDB'],
      demoLink: 'https://demo2.com',
      sourceLink: 'https://github.com/project2',
      likes: 85,
      comments: 8,
    },
  ];

  constructor(private router: Router) {}

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
}
