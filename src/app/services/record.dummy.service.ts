import { Injectable } from '@angular/core';
import { Phrase } from '../models/phrase';
import { RecordService } from './record.service';

@Injectable({
  providedIn: 'root'
})
export class  RecordDummyService implements RecordService  {
  getText(level: string, code: string ): Phrase[] {

    const text: Array<Phrase> = new Array();

    text.push(new Phrase('Malbrough s\'en va-t-en guerre'));
    text.push(new Phrase('Mironton mironton mirontaine'));
    text.push(new Phrase('Ne sait quand reviendra'));
    text.push(new Phrase('Ne sait quand reviendra'));
    text.push(new Phrase('Ne sait quand reviendra'));
    text.push(new Phrase('Il reviendra z\'à Pâques'));
    text.push(new Phrase('Mironton mironton mirontaine'));
    text.push(new Phrase('Il reviendra z\'à Pâques'));
    text.push(new Phrase('Ou à la Trinité'));
    text.push(new Phrase('Ou à la Trinité'));
    text.push(new Phrase('Ou à la Trinité'));
    text.push(new Phrase('La Trinité se passe'));
    text.push(new Phrase('Mironton mironton mirontaine'));
    text.push(new Phrase('La Trinité se passe'));
    text.push(new Phrase('Malbrough ne revient pas'));
    text.push(new Phrase('Malbrough ne revient pas'));
    text.push(new Phrase('Malbrough ne revient pas'));
    return text;
  }
  savePhrase(phrase: Phrase, level: string, code: string): boolean {
    console.log('Method not implemented.');
    return true;
  }


}
