import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControlName, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

  constructor(private http:HttpClient) { }

  form:FormGroup;

  ngOnInit() {

    this.form = new FormGroup({
        amelioration:new FormControl('',Validators.required),
        suggestion:new FormControl('',Validators.required),
        note:new FormControl(),
        date:new FormControl(new Date())
    })
  }

  onSubmit(){
    this.http.post('http://localhost:3000/feedbacks', this.form.value).subscribe(res => {
      this.form.reset();
    })
  }

}
