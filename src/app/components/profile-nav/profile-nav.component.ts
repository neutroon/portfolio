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
import { HttpHeaders } from '@angular/common/http';
import { ProgressSpinnerComponent } from '../progress-spinner/progress-spinner.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'profile-nav',
  standalone: true,
  imports: [
    NgxSkeletonLoaderModule,
    ButtonModule,
    RouterModule,
    SettingComponent,
    TranslateModule,
    ProgressSpinnerComponent,
  ],
  providers: [
    GithubGraphqlService,
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        const token = environment.githubToken;
        console.log('Environment:', environment.environment);
        console.log('Token length:', token ? token.length : 0);
        console.log(
          'Token format check:',
          token ? token.startsWith('ghp_') : false
        );

        if (!token) {
          console.error('GitHub token is missing!');
        }

        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        });

        console.log('Request headers:', {
          Authorization: 'Bearer [REDACTED]',
          'Content-Type': headers.get('Content-Type'),
          Accept: headers.get('Accept'),
        });

        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'https://api.github.com/graphql',
            headers: headers,
          }),
          defaultOptions: {
            watchQuery: {
              fetchPolicy: 'no-cache',
              errorPolicy: 'all',
            },
            query: {
              fetchPolicy: 'no-cache',
              errorPolicy: 'all',
            },
          },
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
  totalContributions: number = 0;
  reposCount: number = 0;
  totalCommitsCount: number = 0;
  isLoading: boolean = true;

  ngOnInit(): void {
    this._PrimeNGConfig.ripple = true;
    this.loadUserData();
    this.loadProfileData();
  }

  private loadUserData(): void {
    const username = 'neutroon';
    console.log('Loading GitHub data for user:', username);
    this._GithubGraphqlService.getUserData(username).subscribe({
      next: (data) => {
        console.log('GitHub data loaded successfully:', data);
        this.totalContributions = data.totalContributions;
        this.reposCount = data.reposCount;
        this.totalCommitsCount = data.totalCommitsCount;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading GitHub data:', error);
        console.error('Error details:', {
          message: error.message,
          networkError: error.networkError,
          graphQLErrors: error.graphQLErrors,
        });
        this.isLoading = false;
      },
    });
  }

  private loadProfileData(): void {
    this._GetDataService.getData().subscribe({
      next: (res) => {
        this.profilePhoto = res[0].profilePhoto;
        this.title = res[0].title;
        this.desc = res[0].desc;
      },
      error: (error) => {
        console.error('Error loading profile data:', error);
      },
    });

    this._GetDataService.getLinks().subscribe({
      next: (res) => {
        this.links = res;
      },
      error: (error) => {
        console.error('Error loading links:', error);
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
