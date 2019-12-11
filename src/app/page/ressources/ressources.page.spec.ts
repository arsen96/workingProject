import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RessourcesPage } from './ressources.page';

describe('RessourcesPage', () => {
  let component: RessourcesPage;
  let fixture: ComponentFixture<RessourcesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RessourcesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RessourcesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
