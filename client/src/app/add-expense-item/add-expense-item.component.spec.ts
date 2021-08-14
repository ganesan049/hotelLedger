import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExpenseItemComponent } from './add-expense-item.component';

describe('AddExpenseItemComponent', () => {
  let component: AddExpenseItemComponent;
  let fixture: ComponentFixture<AddExpenseItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExpenseItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExpenseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
