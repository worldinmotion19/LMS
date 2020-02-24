import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddBooksPage } from './add-books.page';

describe('AddBooksPage', () => {
  let component: AddBooksPage;
  let fixture: ComponentFixture<AddBooksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBooksPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddBooksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
