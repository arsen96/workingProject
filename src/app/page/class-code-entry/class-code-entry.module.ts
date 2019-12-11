import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassCodeEntryPageRoutingModule } from './class-code-entry-routing.module';

import { ClassCodeEntryPage } from './class-code-entry.page';

import {NumpadComponent} from '../../components/numpad/numpad.component';

import { ComponentsModule } from '../../components/components.module';


@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ClassCodeEntryPageRoutingModule
  ],
  declarations: [ClassCodeEntryPage, NumpadComponent]
})
export class ClassCodeEntryPageModule {}
