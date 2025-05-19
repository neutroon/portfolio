import { Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  {
    path: 'projects',
    loadComponent: () =>
      import('./components/projects/projects.component').then(
        (x) => x.ProjectsComponent
      ),
  },
  {
    path: 'skills',
    loadComponent: () =>
      import('./components/skills/skills.component').then(
        (x) => x.SkillsComponent
      ),
  },
  {
    path: 'experience',
    loadComponent: () =>
      import('./components/experience/experience.component').then(
        (x) => x.ExperienceComponent
      ),
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full',
  },
];
