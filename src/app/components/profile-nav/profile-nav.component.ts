import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SettingComponent } from '../setting/setting.component';
import { PrimeNGConfig } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';
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
  styleUrl: './profile-nav.component.scss'
})
export class ProfileNavComponent implements OnInit {
  constructor(private _PrimeNGConfig:PrimeNGConfig, private _Renderer2:Renderer2) {}

  isSettingActive:boolean = false;

  ngOnInit(): void {
    this._PrimeNGConfig.ripple = true
  }
  showSettingMenu(aboutEl:HTMLElement, settingEl:HTMLElement){
    this._Renderer2.setStyle(aboutEl, 'transform', 'translateY(-100%)')
    this._Renderer2.setStyle(settingEl, 'transform', 'translateY(0)')
    this.isSettingActive = true;

  }

  hideSettingMenu(aboutEl:HTMLElement, settingEl:HTMLElement){
    this._Renderer2.setStyle(aboutEl, 'transform', 'translateY(0)')
    this._Renderer2.setStyle(settingEl, 'transform', 'translateY(-120%)')
    this.isSettingActive = false;
  }





  links:any[]=[
    {
      img: './assets/imgs/github.png',
      url: 'https://github.com/neutroon',
      socialName: 'Github'
    },
    {
      img: './assets/imgs/Call.png',
      url: "tel:+201202840018",
      socialName: 'Phone'
    },
    {
      img: './assets/imgs/Gmail.png',
      url: "mailto:nbilha161@gmail.com",
      socialName: 'Gmail'
    },
    {
      img: './assets/imgs/LinkedIn.png',
      url: 'https://www.linkedin.com/in/heshamneu',
      socialName: 'LinkedIn'
    },
    {
      img: './assets/imgs/Whats App.png',
      url: "https://wa.me/201202840018?text=I'm interested in your website",
      socialName: 'Whats App'
    },
    {
      img: './assets/imgs/Instagram.png',
      url: 'https://www.instagram.com/hesham_neutron',
      socialName: 'Instagram'
    },
    {
      img: './assets/imgs/Twitter.png',
      url: 'https://twitter.com/HeShAm_NaBiL_',
      socialName: 'X'
    },
    {
      img: './assets/imgs/Facebook.png',
      url: 'https://www.facebook.com/heshamneutron',
      socialName: 'Facebook'
    },
  ]
}
