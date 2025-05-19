import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, catchError } from 'rxjs/operators';

export interface Project {
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

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private projects: Project[] = [
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
    {
      id: 3,
      title: 'Project 3',
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
      id: 4,
      title: 'Project 4',
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

  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  constructor() {}

  getProjects(): Observable<Project[]> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return of(this.projects).pipe(
      delay(5000), // Simulate API delay
      catchError((error) => {
        this.errorSubject.next(
          'Failed to load projects. Please try again later.'
        );
        return of([]);
      })
    );
  }

  getProjectById(id: number): Observable<Project | undefined> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return of(this.projects.find((p) => p.id === id)).pipe(
      delay(5000), // Simulate API delay
      catchError((error) => {
        this.errorSubject.next(
          'Failed to load project details. Please try again later.'
        );
        return of(undefined);
      })
    );
  }

  clearError(): void {
    this.errorSubject.next(null);
  }
}
