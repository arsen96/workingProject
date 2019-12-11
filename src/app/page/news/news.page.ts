import { Component, OnInit } from '@angular/core';
import { WordpressProviderService } from './services/wordpress-provider.service';
import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  constructor(private wordpressService:WordpressProviderService,private router:Router,private route:ActivatedRoute,public loadingController: LoadingController) { }

  categories:any;
  selected:Boolean = false;

  ngOnInit() {
    this.getAllCategories()
  }

 async getAllCategories(){
   const loading = await this.loadingController.create({
     message: 'Chargement'
   })
   await loading.present();

    this.wordpressService.getALlCategories().pipe
    (finalize(() =>  loading.dismiss()))
    .subscribe(data => {
      this.categories = data;
    })
  }

  categoryChoosed(id){
    this.router.navigate(['post',id],{relativeTo: this.route})
  }


}
