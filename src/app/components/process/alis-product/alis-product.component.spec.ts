import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlisProductComponent } from './alis-product.component';

describe('AlisProductComponent', () => {
  let component: AlisProductComponent;
  let fixture: ComponentFixture<AlisProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlisProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlisProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
