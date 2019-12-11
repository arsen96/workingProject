import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.page.html',
  styleUrls: ['./grades.page.scss'],
})
export class GradesPage implements OnInit {

  public grade: string

  constructor() {
  }



  sendGrade(gradeValue: string) {
    this.grade = gradeValue;
    console.log(this.grade);
    // send grade to server
  }

  ngOnInit() {
  }

  playText() {
    console.log("playText");
  }

}
