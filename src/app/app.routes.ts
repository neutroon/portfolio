import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: "projects", loadComponent: ()=> import('./components/projects/projects.component').then( (x)=> x.ProjectsComponent )},
  {path: "skills", loadComponent: () => import('./components/skills/skills.component').then( (x) => x.SkillsComponent )},
  {path: "experience", loadComponent: ()=> import('./components/experience/experience.component').then( (x) => x.ExperienceComponent ) }
];
