import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlisProductStartComponent } from './alis-product-start.component';

describe('AlisProductStartComponent', () => {
  let component: AlisProductStartComponent;
  let fixture: ComponentFixture<AlisProductStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlisProductStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlisProductStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
