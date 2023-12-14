import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementPickerComponent } from './element-picker.component';

describe('ElementPickerComponent', () => {
  let component: ElementPickerComponent;
  let fixture: ComponentFixture<ElementPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElementPickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElementPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
