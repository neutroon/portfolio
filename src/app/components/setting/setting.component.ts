import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../shared/theme.service';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TranslateService } from '@ngx-translate/core';


export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}


@Component({
  selector: 'setting',
  standalone: true,
  imports: [
    InputSwitchModule,
    FormsModule,
    HttpClientModule,
    SelectButtonModule
  ],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.scss',

})
export class SettingComponent{
  constructor(private _ThemeService:ThemeService, private _TranslateService:TranslateService){}
    darkmode!: boolean;

    stateOptions: any[] = [
      {label: 'عربي', value: 'ar', constant: false},
     {label: 'English', value: 'en', constant: true}
    ];

    value: string = this._TranslateService.defaultLang;





    changlang(lang:string){
      this._TranslateService.use(lang)
      if(lang == 'ar'){
        this.stateOptions[0].constant = true
        this.stateOptions[1].constant = false
      }else{
        this.stateOptions[1].constant = true
        this.stateOptions[0].constant = false
      }
    }


  changeTheme(){
    if (this.darkmode) {
      this._ThemeService.switchTheme('lara-dark-blue')
    }else{
      this._ThemeService.switchTheme('lara-light-blue')
    }
  }
}


