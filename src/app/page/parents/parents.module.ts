import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParentsPageRoutingModule } from './parents-routing.module';
import { ParentsPage } from './parents.page';
import { File } from '@ionic-native/file/ngx'
import { SocialSharing } from '@ionic-native/social-sharing/ngx'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParentsPageRoutingModule
  ],
  providers:[
    File,
    SocialSharing
  ],
  declarations: [ParentsPage
  ]
})
export class ParentsPageModule {}
