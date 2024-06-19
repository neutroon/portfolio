import { Component, OnInit, Renderer2 } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { GetDataService } from '../../shared/services/get-data.service';
import { project } from '../../shared/interfaces/project';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit {
  constructor(
    private _GetDataService: GetDataService,
    private _Renderer2: Renderer2
  ) {}
  changeVeiw(project: any, projectImg: HTMLImageElement) {
    project.ischangeViewLoading = true;
    projectImg.addEventListener('load', () => {
      project.ischangeViewLoading = false;
    });
    if (projectImg.getAttribute('src') == project.mobile?.gif) {
      this._Renderer2.setAttribute(projectImg, 'src', project.desktop?.gif);
    } else {
      this._Renderer2.setAttribute(projectImg, 'src', project.mobile?.gif);
    }
  }

  projects: project[] = [];

  ngOnInit(): void {
    this._GetDataService.getProjects().subscribe({
      next: (res) => {
        this.projects = res;
        console.log(res);
      },
    });
  }
}
