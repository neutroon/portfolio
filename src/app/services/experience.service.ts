import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Experience } from '../interfaces/experience.interface';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  private mockExperiences: Experience[] = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'Tech Solutions Inc.',
      location: 'Remote',
      startDate: '2022-01',
      endDate: 'Present',
      description:
        'Led frontend development for enterprise applications using Angular and PrimeNG. Implemented responsive designs, optimized performance, and mentored junior developers.',
      skills: ['Angular', 'TypeScript', 'PrimeNG', 'SCSS', 'RxJS', 'NgRx'],
      logo: 'https://bcassetcdn.com/public/blog/wp-content/uploads/2022/11/09183937/denside-logo-design-d-letter-logo-concept-by-abdul-gaffar-dribbble.png',
    },
    {
      id: '2',
      title: 'Frontend Developer',
      company: 'Digital Innovations',
      location: 'New York, NY',
      startDate: '2020-06',
      endDate: '2021-12',
      description:
        'Developed and maintained multiple web applications using Angular. Collaborated with UX designers to implement responsive and accessible interfaces.',
      skills: ['Angular', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap'],
      logo: 'https://cdn.dribbble.com/userupload/18467822/file/original-6dc62fc38015a876784c9dcc98737906.jpg?resize=400x0',
    },
    {
      id: '3',
      title: 'Junior Web Developer',
      company: 'WebCraft Studios',
      location: 'Boston, MA',
      startDate: '2019-01',
      endDate: '2020-05',
      description:
        'Built and maintained client websites using modern web technologies. Worked closely with senior developers to implement new features and fix bugs.',
      skills: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'PHP'],
      logo: 'https://logopond.com/logos/c5f81b502d4a0f6a83056914f1613968.png',
    },
  ];

  constructor() {}

  getExperiences(): Observable<Experience[]> {
    // Simulate API delay
    return of(this.mockExperiences);
  }

  getExperienceById(id: string): Observable<Experience | undefined> {
    const experience = this.mockExperiences.find((exp) => exp.id === id);
    return of(experience);
  }

  // Method to simulate API error
  getExperiencesWithError(): Observable<Experience[]> {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.error(new Error('Failed to fetch experiences'));
      }, 1000);
    });
  }
}
