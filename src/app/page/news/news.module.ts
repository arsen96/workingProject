import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsPageRoutingModule } from './news-routing.module';

import { NewsPage } from './news.page';
import { WordpressProviderService } from './services/wordpress-provider.service';
import { HttpClientModule } from '@angular/common/http';
import { PostsComponent } from './posts/posts.component';
import { CutDescriptionPipe, SafeHtml } from './pipe/cut-description.pipe';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsPageRoutingModule,
    HttpClientModule
  ],
  providers:[
    WordpressProviderService
  ],
  
  declarations: [NewsPage,PostsComponent, CutDescriptionPipe,SafeHtml]
})
export class NewsPageModule {}
