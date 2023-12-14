import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptsNewPageComponent } from './receipts-new-page.component';

describe('ReceiptsNewPageComponent', () => {
  let component: ReceiptsNewPageComponent;
  let fixture: ComponentFixture<ReceiptsNewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiptsNewPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceiptsNewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
