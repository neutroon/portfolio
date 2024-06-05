import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SettingComponent } from '../setting/setting.component';
import { PrimeNGConfig } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';
import { GetDataService } from '../../shared/services/get-data.service';

@Component({
  selector: 'profile-nav',
  standalone: true,
  imports: [
    ButtonModule,
    RouterModule,
    SettingComponent,
    TranslateModule, // Add TranslateModule here
  ],
  templateUrl: './profile-nav.component.html',
  styleUrl: './profile-nav.component.scss',
})
export class ProfileNavComponent implements OnInit {
  constructor(
    private _PrimeNGConfig: PrimeNGConfig,
    private _Renderer2: Renderer2,
    private _GetDataService: GetDataService
  ) {}

  profilePhoto!: string;
  title!: string;
  desc!: string;

  isSettingActive: boolean = false;
  links!: any[];
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
