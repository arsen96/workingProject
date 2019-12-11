import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StartingPageRoutingModule } from './starting-routing.module';

import { StartingPage } from './starting.page';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    StartingPageRoutingModule
  ],
  declarations: [StartingPage]
})
export class StartingPageModule {}
