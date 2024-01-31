import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SettingComponent } from '../setting/setting.component';
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'profile-nav',
  standalone: true,
  imports: [
    ButtonModule,
    RouterModule,
    SettingComponent
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
}
