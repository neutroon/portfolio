import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    ButtonModule,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {


  changeVeiw(project:any){
  let index = this.projects.indexOf(project);
  if(this.projects[index].device == 'mobile'){
    this.projects[index].device = 'desktop'
  }else{
    this.projects[index].device = 'mobile'
  }
  }






  projects = [
    {
      device: 'mobile',
      gif: `./assets/imgs/project1/`,
      url: ''
    },
    {
      device: 'desktop',
      gif: './assets/imgs/project2/',
      url: ''
    }
  ]





}
