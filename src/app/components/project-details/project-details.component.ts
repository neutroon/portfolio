import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

interface Project {
  id: number;
  title: string;
  description: string;
  images: string[];
  technologies: string[];
  demoLink: string;
  sourceLink: string;
}

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule],
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {
  currentProjectIndex = 0;
  projects: Project[] = [
    {
      id: 1,
      title: 'Project 1',
      description: 'Description for project 1',
      images: [
        'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210401151214/What-is-Website.png',
      ],
      technologies: ['Angular', 'TypeScript', 'SCSS'],
      demoLink: 'https://demo1.com',
      sourceLink: 'https://github.com/...',
    },
    {
      id: 2,
      title: 'Project 2',
      description: 'Description for project 2',
      images: [
        'https://99designs-blog.imgix.net/blog/wp-content/uploads/2021/01/abstract-website-copy.jpg?auto=format&q=60&fit=max&w=930',
      ],
      technologies: ['React', 'Node.js', 'MongoDB'],
      demoLink: 'https://demo2.com',
      sourceLink: 'https://github.com/...',
    },
    // Add more projects here
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  @HostListener('wheel', ['$event'])
  onScroll(event: WheelEvent) {
    event.preventDefault();
    if (event.deltaY > 0) {
      this.scrollToNextProject();
    } else {
      this.scrollToPreviousProject();
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
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
    if (this.currentProjectIndex < this.projects.length - 1) {
      this.currentProjectIndex++;
      this.scrollToProject(this.currentProjectIndex);
      this.updateRoute();
    }
  }

  scrollToPreviousProject() {
    if (this.currentProjectIndex > 0) {
      this.currentProjectIndex--;
      this.scrollToProject(this.currentProjectIndex);
      this.updateRoute();
    }
  }

  scrollToProject(index: number) {
    const projectElement = document.getElementById(`project-${index}`);
    if (projectElement) {
      projectElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  updateRoute() {
    const currentProject = this.projects[this.currentProjectIndex];
    this.router.navigate(['/projects', currentProject.id], {
      replaceUrl: true,
    });
  }

  closeProject() {
    this.router.navigate(['/projects']);
  }

  ngOnInit() {
    // Get project ID from route and set current project
    this.route.params.subscribe((params) => {
      const projectId = +params['id'];
      const index = this.projects.findIndex((p) => p.id === projectId);
      if (index !== -1) {
        this.currentProjectIndex = index;
        this.scrollToProject(index);
      }
    });

    // Add scroll snap behavior
    document.body.style.overflow = 'hidden';
  }

  ngOnDestroy() {
    // Reset body overflow
    document.body.style.overflow = '';
  }
}
