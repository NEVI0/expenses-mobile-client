import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateExpensePage } from './update-expense.page';

describe('UpdateExpensePage', () => {
  let component: UpdateExpensePage;
  let fixture: ComponentFixture<UpdateExpensePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateExpensePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateExpensePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
