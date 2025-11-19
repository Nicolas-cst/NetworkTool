import { Injectable } from '@angular/core';
import fr from '../../../assets/fr.json';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private translations: any = fr; // tu pourrais gérer plusieurs langues ici

  get(path: string): string {
    return path.split('.').reduce((acc, key) => acc?.[key], this.translations) || path;
  }
}