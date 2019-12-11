import { Injectable } from '@angular/core';
import { Phrase } from '../models/phrase';

@Injectable({
  providedIn: 'root'
})
export abstract class  RecordService {

  abstract getText(level: string, code: string): Array<Phrase>;
  abstract savePhrase(phrase: Phrase, level: string, code: string): boolean;
}
