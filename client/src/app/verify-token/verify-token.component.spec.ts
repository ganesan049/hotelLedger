import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyTokenComponent } from './verify-token.component';

describe('VerifyTokenComponent', () => {
  let component: VerifyTokenComponent;
  let fixture: ComponentFixture<VerifyTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
