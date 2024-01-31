import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(@Inject(DOCUMENT) private _Document:Document) { }

  switchTheme(theme: string){
    let themeLink = this._Document.getElementById('app-theme') as HTMLLinkElement

    if (themeLink) {
      themeLink.href = theme + '.css';
    }
  }
}
