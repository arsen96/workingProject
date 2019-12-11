import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'cutDescription'
})
export class CutDescriptionPipe implements PipeTransform {

  constructor(){

  }

  transform(value: string, limit = 25, completeWords = false, ellipsis = '...') {
    if (completeWords) {
      limit = value.substr(0, limit).lastIndexOf(' ');
    }
    return value.length > limit ? value.substr(0, limit) + ellipsis : value;
  }
}


@Pipe({
  name: 'safeHtml'
})
export class SafeHtml implements PipeTransform {

  constructor(private sanitizer:DomSanitizer){

  }

  transform(html) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  
}





