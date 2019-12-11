import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-class-code-entry',
  templateUrl: './class-code-entry.page.html',
  styleUrls: ['./class-code-entry.page.scss'],
})
export class ClassCodeEntryPage implements OnInit {

  constructor() { }

  code: string = "entre le code classe";

  receiveCode(event: EventEmitter<string>) {
    this.code = <string><unknown>event;
    console.log(this.code);
    // send code to server
  }

  ngOnInit() {
  }
  
  playText() {
    console.log("playText");
  }

}
