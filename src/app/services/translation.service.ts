import { Injectable } from '@angular/core';
import { Translation } from '../configs/translate';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor() { }

  public getTranslation(language: string): any {
    if (language == 'en') return Translation.english;
    return Translation.french;
  }
}
