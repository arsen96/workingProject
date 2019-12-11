import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClassCodeEntryPage } from './class-code-entry.page';

describe('ClassCodeEntryPage', () => {
  let component: ClassCodeEntryPage;
  let fixture: ComponentFixture<ClassCodeEntryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassCodeEntryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClassCodeEntryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
