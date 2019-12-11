import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-numpad',
  templateUrl: './numpad.component.html',
  styleUrls: ['./numpad.component.scss'],
})
export class NumpadComponent implements OnInit {

@Input() pagetitle: String = "Enter Pin";

pin: string = "";
codeValidated: boolean = false;
pinText: boolean = true;

@Output() change: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router) { }

  emitEvent() {
    this.change.emit(this.pin);
    console.log('entry hit');
    this.router.navigate(['/grades']);
    this.pin = "";
  }

  handleInput(pin: string) {
    this.pinText = false;

    if (pin === "clear") {
      this.pin = "";
      this.codeValidated = false;
      this.pinText = true;
      return;
    }

    if (this.pin.length < 5) {
      this.pinText = false;
    }

    if (this.pin.length === 3) {
      this.codeValidated = true;
    }
    
    if (this.pin.length === 4) {
      return;
    }
    this.pin += pin;
  }

  ngOnInit() {}

}
