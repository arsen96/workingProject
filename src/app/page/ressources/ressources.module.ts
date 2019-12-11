import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RessourcesPageRoutingModule } from './ressources-routing.module';

import { RessourcesPage } from './ressources.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RessourcesPageRoutingModule
  ],
  declarations: [RessourcesPage]
})
export class RessourcesPageModule {}
