import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassCodeEntryPage } from './class-code-entry.page';

const routes: Routes = [
  {
    path: '',
    component: ClassCodeEntryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassCodeEntryPageRoutingModule {}
