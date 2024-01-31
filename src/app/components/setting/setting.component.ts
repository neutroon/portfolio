import { Component, WritableSignal, signal } from '@angular/core';
import { ThemeService } from '../../shared/theme.service';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'setting',
  standalone: true,
  imports: [
    InputSwitchModule,
    FormsModule
  ],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.scss',

})
export class SettingComponent {
  constructor(private _ThemeService:ThemeService){}
    darkmode!: boolean;

  changeTheme(){
    if (this.darkmode) {
      this._ThemeService.switchTheme('lara-dark-blue')
    }else{
      this._ThemeService.switchTheme('lara-light-blue')
    }
  }
}
