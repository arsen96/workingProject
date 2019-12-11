import { NgModule } from '@angular/core';
import { ToggleMenuComponent } from './toggle-menu/toggle-menu.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [ToggleMenuComponent],
    exports: [ToggleMenuComponent],
    imports: [IonicModule]
})

export class ComponentsModule{}