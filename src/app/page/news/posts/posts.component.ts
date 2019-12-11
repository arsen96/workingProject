import { Component, OnInit,Input } from '@angular/core';
import { WordpressProviderService } from '../services/wordpress-provider.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {

  //@Input() selectedId: any;
  allPosts:any;

  categoryId:any;

  constructor(private wordpressService:WordpressProviderService,private route:ActivatedRoute,private domSanitizer:DomSanitizer,public loadingController: LoadingController ) { }

  ngOnInit() {
    this.route.params.subscribe(paramMap => {
      this.categoryId = +paramMap['id']
      this.getAllPostsInCategories()
    })
  }

  async getAllPostsInCategories(){
    const loading = await this.loadingController.create({
      message: 'Chargement'
    })
    await loading.present();

    this.wordpressService.getAllPostsInCategory(this.categoryId).pipe
    (finalize(() => loading.dismiss()) )
    .subscribe(data => {
      this.allPosts = data;
    })
  }

  getHtml(html){
    let result =  this.domSanitizer.bypassSecurityTrustHtml(html);
    return result
    
  }

  readPost(id){
    console.log('id',id);
    console.log();
    
     window.location.href = `${this.allPosts[id].link}`,'_blank';
  }

  

}
