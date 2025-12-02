import { Injectable } from '@angular/core';
import en from '../../../assets/en.json';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private translations: any = en; // tu pourrais gérer plusieurs langues ici

  get(path: string): string {
    return path.split('.').reduce((acc, key) => acc?.[key], this.translations) || path;
  }
}