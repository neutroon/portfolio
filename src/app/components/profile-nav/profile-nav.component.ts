import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SettingComponent } from '../setting/setting.component';
import { PrimeNGConfig } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';
import { GetDataService } from '../../shared/services/get-data.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { GithubGraphqlService } from '../../shared/services/github-graphql.service';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { HttpHeaders } from '@angular/common/http'; // Import HttpHeaders
import { ProgressSpinnerComponent } from '../progress-spinner/progress-spinner.component';
@Component({
  selector: 'profile-nav',
  standalone: true,
  imports: [
    NgxSkeletonLoaderModule,
    ButtonModule,
    RouterModule,
    SettingComponent,
    TranslateModule, // Add TranslateModule here
    ProgressSpinnerComponent,
  ],
  providers: [
    GithubGraphqlService,
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'https://api.github.com/graphql',
            headers: new HttpHeaders({
              // Use HttpHeaders object
              Authorization: `Bearer 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`,
            }),
          }),
        };
      },
      deps: [HttpLink],
    },
    Apollo,
  ],
  templateUrl: './profile-nav.component.html',
  styleUrl: './profile-nav.component.scss',
})
export class ProfileNavComponent implements OnInit {
  constructor(
    private _PrimeNGConfig: PrimeNGConfig,
    private _Renderer2: Renderer2,
    private _GetDataService: GetDataService,
    private _GithubGraphqlService: GithubGraphqlService
  ) {}
  isSettingActive: boolean = false;

  profilePhoto!: string;
  title!: string;
  desc!: string;

  links!: any[];
  projects!: any[];
  totalContributions!: number;
  reposCount!: number;
  totalCommitsCount!: number;
  ngOnInit(): void {
    this._PrimeNGConfig.ripple = true;

    this._GetDataService.getData().subscribe((res) => {
      this.profilePhoto = res[0].profilePhoto;
      this.title = res[0].title;
      this.desc = res[0].desc;
    });

    // get links
    this._GetDataService.getLinks().subscribe({
      next: (res) => {
        this.links = res;
      },
    });

    // get contributions
    const username = 'neutroon'; // Replace with the GitHub username you want to query
    this._GithubGraphqlService.getTotalContributions(username).subscribe({
      next: (res) => {
        this.totalContributions = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
    // get repos count
    this._GithubGraphqlService.getUserRepoCount(username).subscribe({
      next: (res) => {
        this.reposCount = res;
      },
    });
    // get latest commits count
    this._GithubGraphqlService.getTotalLatestCommitsCount(username).subscribe({
      next: (res) => {
        this.totalCommitsCount = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  showSettingMenu(aboutEl: HTMLElement, settingEl: HTMLElement) {
    this._Renderer2.setStyle(aboutEl, 'transform', 'translateY(-100%)');
    this._Renderer2.setStyle(settingEl, 'transform', 'translateY(0)');
    this.isSettingActive = true;
  }

  hideSettingMenu(aboutEl: HTMLElement, settingEl: HTMLElement) {
    this._Renderer2.setStyle(aboutEl, 'transform', 'translateY(0)');
    this._Renderer2.setStyle(settingEl, 'transform', 'translateY(-120%)');
    this.isSettingActive = false;
  }
}
