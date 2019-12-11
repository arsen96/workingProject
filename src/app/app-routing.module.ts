import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'home', loadChildren: './page/home/home.module#HomePageModule'},
  { path: 'list', loadChildren: './page/list/list.module#ListPageModule'},
  { path: 'login', loadChildren: './page/login/login.module#LoginPageModule'},
  { path: 'profile', loadChildren: './page/profile/profile.module#ProfilePageModule'},
  { path: 'starting', loadChildren: './page/starting/starting.module#StartingPageModule'},
  { path: 'record', loadChildren: './page/record/record.module#RecordPageModule'},
  {
    path: 'grades',
    loadChildren: () => import('./page/grades/grades.module').then( m => m.GradesPageModule)
  },
  {
    path: 'ressources',
    loadChildren: () => import('./page/ressources/ressources.module').then( m => m.RessourcesPageModule)
  },
 
  {
    path: 'blog',
    loadChildren: () => import('./page/blog/blog.module').then( m => m.BlogPageModule)
  },
  {
    path: 'news',
    loadChildren: () => import('./page/news/news.module').then( m => m.NewsPageModule)
  },
  {
    path: 'newsletter',
    loadChildren: () => import('./page/newsletter/newsletter.module').then( m => m.NewsletterPageModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('./page/feedback/feedback.module').then( m => m.FeedbackPageModule)
  },
  {
    path: 'parents',
    loadChildren: () => import('./page/parents/parents.module').then( m => m.ParentsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
