import { Component, OnInit } from '@angular/core';
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

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
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
  projects: Project[] = [
    {
      id: '1',
      title: 'Portfolio Website',
      description:
        'A modern portfolio website built with Angular and PrimeNG, featuring a responsive design and smooth animations.',
      image: 'assets/images/projects/portfolio.jpg',
      technologies: ['Angular', 'PrimeNG', 'SCSS', 'TypeScript'],
      liveUrl: 'https://portfolio.example.com',
      githubUrl: 'https://github.com/username/portfolio',
      featured: true,
      likes: 42,
      comments: 8,
    },
    {
      id: '2',
      title: 'E-commerce Platform',
      description:
        'A full-stack e-commerce platform with real-time inventory management and secure payment processing.',
      image: 'assets/images/projects/ecommerce.jpg',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      liveUrl: 'https://shop.example.com',
      githubUrl: 'https://github.com/username/ecommerce',
      featured: true,
      likes: 56,
      comments: 12,
    },
    {
      id: '3',
      title: 'Task Management App',
      description:
        'A collaborative task management application with real-time updates and team collaboration features.',
      image: 'assets/images/projects/taskmanager.jpg',
      technologies: ['Vue.js', 'Firebase', 'Tailwind CSS'],
      liveUrl: 'https://tasks.example.com',
      githubUrl: 'https://github.com/username/taskmanager',
      featured: false,
      likes: 28,
      comments: 5,
    },
  ];

  hoveredProject: string | null = null;

  getFeaturedCount(): number {
    return this.projects.filter((project) => project.featured).length;
  }

  getTotalTechnologies(): number {
    const uniqueTechnologies = new Set(
      this.projects.flatMap((project) => project.technologies)
    );
    return uniqueTechnologies.size;
  }

  onProjectHover(projectId: string) {
    this.hoveredProject = projectId;
  }

  onProjectLeave() {
    this.hoveredProject = null;
  }
}
