import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-starting',
  templateUrl: './starting.page.html',
  styleUrls: ['./starting.page.scss'],
})
export class StartingPage implements OnInit {

  receivedCode: string = undefined;

  constructor() { }

  createClasse() {
    this.receivedCode = "1234";
  }

  ngOnInit() {
  }

  playText() {
    console.log("playText");
  }
}
