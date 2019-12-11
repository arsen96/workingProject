import { Component, OnInit } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.page.html',
  styleUrls: ['./parents.page.scss'],
})
export class ParentsPage implements OnInit {

  constructor(private socialSharing:SocialSharing,private file:File) { }

  text="Découvrez Mathia, l'assistant vocal 3D intelligent pour les mthématiques au Cycle 2"
  url="https://mathia.education"

  openEmailFields:boolean = false;
  /*EMAIL params*/

  emailTo:string;
  subject:string;
  message:string;


  ngOnInit() {

  }

  async shareTwitter(){

    try {
     return await this.socialSharing.shareViaTwitter(null,`${this.file.applicationDirectory}/src/assets/mathia`)
    }
    catch(error) {
      console.error(error);
    }
  }

  removeTempFile(name){
    this.file.removeFile(this.file.cacheDirectory,name)
  }

  async resolveLocalFile(){
    return this.file.copyFile(`${this.file.applicationDirectory}/src/assets/mathia`,'mascotte.png',this.file.cacheDirectory,`${new Date().getTime()}.jpg`)
  }


   shareEmail(){
    
   // let file = await this.resolveLocalFile()
      
    this.socialSharing.shareViaEmail(`${this.message}. ${this.url} `,`${this.subject}`,[`${this.emailTo}`],null,null,null).then(() => {
      //this.removeTempFile(file.name)
      this.openEmailFields = false;
   //   this.dialogs.alert('Votre mail a bien été envoyé')
    }).catch(e => {

    })
  }

  async shareFacebook(){
    let file = await this.resolveLocalFile()
    console.log('file',file);
    
    this.socialSharing.shareViaFacebook(null,file.nativeURL,this.url).then(() => {
        this.removeTempFile(file.name)
    }).catch(e => {
      console.log('e',e);
      
    })

   
  }
  
 async shareWhatsApp(){
  
   this.socialSharing.shareViaWhatsApp(this.text,null,this.url).then(() => {
     
   })
   
  }

}
