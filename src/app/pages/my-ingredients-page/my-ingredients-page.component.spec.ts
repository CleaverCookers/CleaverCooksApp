import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyIngredientsPageComponent } from './my-ingredients-page.component';

describe('MyIngredientsPageComponent', () => {
  let component: MyIngredientsPageComponent;
  let fixture: ComponentFixture<MyIngredientsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyIngredientsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyIngredientsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
