import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx'
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {from} from 'rxjs'
import {finalize} from 'rxjs/operators';


@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.page.html',
  styleUrls: ['./newsletter.page.scss'],
})
export class NewsletterPage implements OnInit {

  base_url =   "https://us4.api.mailchimp.com/3.0/lists/1fa3f4ed1d/members"

  
  //Formulaire Mailchimp
  email_type:string;
  message:string='';


  httpOptions:any;

  constructor(private http:HttpClient,private nativeHttp:HTTP,private plt:Platform) { 
  }

 ngOnInit() {
  
  // this.plt.is('cordova') ? this.getallListMailchimp() : this.getAllListFromDesktop()
 }

 
 getAllListFromDesktop(){
   
  //  let httpHeaders = new HttpHeaders()
  //  .set('Content-Type', 'application/json')
  //  .set( 'Access-Control-Allow-Origin','*')
  //  .set('Access-Control-Allow-Methods','GET')
   
  //  let options = {
  //    headers: httpHeaders
  //  };  

  //  this.http.get(`${this.base_url_get}`,options).pipe(
  //    finalize(() => console.log('finished')
  //    ))
  //    .subscribe(data => {
  //      console.log('daarta',data);
  //    })
 }

  getallListMailchimp(){
   
  //  let nativeCall = this.nativeHttp.get(`${this.base_url}`,{},{
  //    'Content-Type':'application/json',
  //    headers: { Authorization: 'Basic c3059bc19df8715b8f644c8391310e05-us4' }
  //  });
 
  // from(nativeCall).pipe(
  //    finalize(() => console.log('yeees')
  //  )).
  //    subscribe(data => {
  //   let res =   JSON.parse(data.data)
  //   console.log('result',res);
  //  })
 }

 postNewSubscriber(form){

  
    let formData = {
      email_type:form.value.email_type,
      message:form.value.message,
      status:"subscribed"
    }
    console.log('postdata',formData);
    

   let nativeCallPost = this.nativeHttp.post(`${this.base_url}`,formData,{});

    from(nativeCallPost).subscribe(data => {
        console.log('donnée envoyée',data);
    },err => {
      console.log('error',err);
    })
 }

//  getDevices(){
//    console.log('clciked');
   
//    if  (this.plt.is('cordova')) {
//      console.log('mobile');
//      return this.getallListMailchimp()
//    } else {
//      console.log('desktop');
//     return  this.getAllListFromDesktop()
//   }
//  }

  

}
