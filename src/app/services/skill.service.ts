import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, catchError } from 'rxjs/operators';

export interface Skill {
  id: number;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'tools';
  level: number; // 1-5
  icon?: string;
  description?: string;
  yearsOfExperience?: number;
  projects?: number;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  private skills: Skill[] = [
    {
      id: 1,
      name: 'Angular',
      category: 'frontend',
      level: 5,
      icon: 'pi pi-code',
      description: 'Advanced knowledge in Angular framework and ecosystem',
      yearsOfExperience: 3,
      projects: 10,
    },
    {
      id: 2,
      name: 'TypeScript',
      category: 'frontend',
      level: 5,
      icon: 'pi pi-code',
      description:
        'Strong TypeScript development experience with advanced type system',
      yearsOfExperience: 3,
      projects: 12,
    },
    {
      id: 3,
      name: 'React',
      category: 'frontend',
      level: 4,
      icon: 'pi pi-code',
      description:
        'Proficient in React development with hooks and modern patterns',
      yearsOfExperience: 2,
      projects: 8,
    },
    {
      id: 4,
      name: 'Vue.js',
      category: 'frontend',
      level: 3,
      icon: 'pi pi-code',
      description: 'Experience with Vue.js and its composition API',
      yearsOfExperience: 1,
      projects: 4,
    },
    {
      id: 5,
      name: 'SASS/SCSS',
      category: 'frontend',
      level: 5,
      icon: 'pi pi-palette',
      description: 'Expert in SASS/SCSS with advanced styling techniques',
      yearsOfExperience: 4,
      projects: 15,
    },
    {
      id: 6,
      name: 'Node.js',
      category: 'backend',
      level: 4,
      icon: 'pi pi-server',
      description: 'Experience with Node.js backend development and Express',
      yearsOfExperience: 2,
      projects: 8,
    },
    {
      id: 7,
      name: 'Python',
      category: 'backend',
      level: 4,
      icon: 'pi pi-server',
      description: 'Proficient in Python development with Django and Flask',
      yearsOfExperience: 3,
      projects: 9,
    },
    {
      id: 8,
      name: 'Java',
      category: 'backend',
      level: 3,
      icon: 'pi pi-server',
      description: 'Experience with Java Spring Boot development',
      yearsOfExperience: 2,
      projects: 5,
    },
    {
      id: 9,
      name: 'MongoDB',
      category: 'database',
      level: 4,
      icon: 'pi pi-database',
      description: 'Proficient in MongoDB database management and aggregation',
      yearsOfExperience: 2,
      projects: 6,
    },
    {
      id: 10,
      name: 'PostgreSQL',
      category: 'database',
      level: 4,
      icon: 'pi pi-database',
      description: 'Experience with PostgreSQL and complex queries',
      yearsOfExperience: 2,
      projects: 7,
    },
    {
      id: 11,
      name: 'Redis',
      category: 'database',
      level: 3,
      icon: 'pi pi-database',
      description: 'Knowledge of Redis for caching and real-time features',
      yearsOfExperience: 1,
      projects: 3,
    },
    {
      id: 12,
      name: 'Docker',
      category: 'devops',
      level: 4,
      icon: 'pi pi-box',
      description: 'Experience with containerization and Docker Compose',
      yearsOfExperience: 2,
      projects: 8,
    },
    {
      id: 13,
      name: 'Kubernetes',
      category: 'devops',
      level: 3,
      icon: 'pi pi-box',
      description: 'Basic knowledge of Kubernetes orchestration',
      yearsOfExperience: 1,
      projects: 2,
    },
    {
      id: 14,
      name: 'AWS',
      category: 'devops',
      level: 3,
      icon: 'pi pi-cloud',
      description: 'Experience with AWS services (EC2, S3, Lambda)',
      yearsOfExperience: 2,
      projects: 5,
    },
    {
      id: 15,
      name: 'Git',
      category: 'tools',
      level: 5,
      icon: 'pi pi-github',
      description: 'Expert in version control and Git workflows',
      yearsOfExperience: 4,
      projects: 20,
    },
    {
      id: 16,
      name: 'Jest',
      category: 'tools',
      level: 4,
      icon: 'pi pi-check-circle',
      description: 'Proficient in unit and integration testing with Jest',
      yearsOfExperience: 2,
      projects: 10,
    },
    {
      id: 17,
      name: 'Cypress',
      category: 'tools',
      level: 3,
      icon: 'pi pi-check-circle',
      description: 'Experience with end-to-end testing using Cypress',
      yearsOfExperience: 1,
      projects: 4,
    },
    {
      id: 18,
      name: 'Webpack',
      category: 'tools',
      level: 4,
      icon: 'pi pi-cog',
      description:
        'Advanced knowledge of Webpack configuration and optimization',
      yearsOfExperience: 2,
      projects: 8,
    },
  ];

  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  constructor() {}

  getSkills(): Observable<Skill[]> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return of(this.skills).pipe(
      delay(2000), // Simulate API delay
      catchError((error) => {
        this.errorSubject.next(
          'Failed to load skills. Please try again later.'
        );
        return of([]);
      })
    );
  }

  getSkillsByCategory(): Observable<SkillCategory[]> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    const categories = this.groupSkillsByCategory();
    return of(categories).pipe(
      delay(2000), // Simulate API delay
      catchError((error) => {
        this.errorSubject.next(
          'Failed to load skills. Please try again later.'
        );
        return of([]);
      })
    );
  }

  getSkillById(id: number): Observable<Skill | undefined> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return of(this.skills.find((s) => s.id === id)).pipe(
      delay(1000), // Simulate API delay
      catchError((error) => {
        this.errorSubject.next(
          'Failed to load skill details. Please try again later.'
        );
        return of(undefined);
      })
    );
  }

  private groupSkillsByCategory(): SkillCategory[] {
    const categories: { [key: string]: Skill[] } = {};

    this.skills.forEach((skill) => {
      if (!categories[skill.category]) {
        categories[skill.category] = [];
      }
      categories[skill.category].push(skill);
    });

    return Object.entries(categories).map(([name, skills]) => ({
      name: this.formatCategoryName(name),
      skills: skills.sort((a, b) => b.level - a.level),
    }));
  }

  private formatCategoryName(category: string): string {
    return category.charAt(0).toUpperCase() + category.slice(1);
  }

  clearError(): void {
    this.errorSubject.next(null);
  }
}
