import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsPage } from './news.page';
import { PostsComponent } from './posts/posts.component';

const routes: Routes = [
  {
    path: '',
    component: NewsPage
  },
  {
    path: 'post/:id',
    component: PostsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsPageRoutingModule {}
