import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Accueil',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Connecter classe',
      url: '/class-code-entry',
      icon: 'list'
    },
    {
        title: 'Mon profil',
        url: '/profile',
        icon: 'contact'
      },
     {
        title: 'Mon enregistrement',
        url: '/record',
        icon: 'contact'
      },
      {
        title: 'Ressources',
        url: '/ressources',
        icon: 'globe'
      },
      {
        title: 'Actualités',
        url: '/news',
        icon: 'clipboard'
      },
      {
        title: 'Newsletter',
        url: '/newsletter',
        icon: 'paper'
      },
      {
        title: 'Donner son avis',
        url: '/feedback',
        icon: 'chatboxes'
      },
      {
        title: 'Parents',
        url: '/parents',
        icon: 'person'
      },
      
  ];

  showSplash = true;
  source: any;
  progress: number = 0;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }
  

  loading() {
    if (this.progress < 1) {
      this.source = timer(0, 100).subscribe(val => {
        this.progress += val; console.log(this.progress);
      });
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      this.statusBar.styleDefault();
      this.loading();
      setTimeout(() => {
        this.showSplash = false; 
        this.source.unsubscribe();
        this.source = 0;
      }, 3000)
      })
    };




  }
  

