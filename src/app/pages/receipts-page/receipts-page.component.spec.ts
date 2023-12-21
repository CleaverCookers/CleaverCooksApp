import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptsPageComponent } from './receipts-page.component';

describe('ReceiptsPageComponent', () => {
  let component: ReceiptsPageComponent;
  let fixture: ComponentFixture<ReceiptsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiptsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiptsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
