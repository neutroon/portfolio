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
  projects: project[] = [];
  private imageCache: Map<string, HTMLImageElement> = new Map();

  constructor(
    private _GetDataService: GetDataService,
    private _Renderer2: Renderer2
  ) {}

  ngOnInit(): void {
    this._GetDataService.getProjects().subscribe({
      next: (res) => {
        this.projects = res;
        // Preload images
        this.preloadImages();
      },
    });
  }

  private preloadImages(): void {
    this.projects.forEach((project) => {
      if (project.mobile?.gif) {
        this.preloadImage(project.mobile.gif);
      }
      if (project.desktop?.gif) {
        this.preloadImage(project.desktop.gif);
      }
    });
  }

  private preloadImage(src: string): void {
    if (!this.imageCache.has(src)) {
      const img = new Image();
      img.src = src;
      this.imageCache.set(src, img);
    }
  }

  changeView(project: project, projectImg: HTMLImageElement): void {
    const currentSrc = projectImg.getAttribute('src');
    const newSrc =
      currentSrc === project.mobile?.gif
        ? project.desktop?.gif
        : project.mobile?.gif;

    if (!newSrc) return;

    // Check if image is already cached
    const cachedImage = this.imageCache.get(newSrc);
    if (cachedImage?.complete) {
      this._Renderer2.setAttribute(projectImg, 'src', newSrc);
      project.ischangeViewLoading = false;
    } else {
      project.ischangeViewLoading = true;
      const img = new Image();
      img.onload = () => {
        this._Renderer2.setAttribute(projectImg, 'src', newSrc);
        project.ischangeViewLoading = false;
        this.imageCache.set(newSrc, img);
      };
      img.src = newSrc;
    }
  }
}
