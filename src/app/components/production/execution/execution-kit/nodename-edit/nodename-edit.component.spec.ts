import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodenameEditComponent } from './nodename-edit.component';

describe('NodenameEditComponent', () => {
  let component: NodenameEditComponent;
  let fixture: ComponentFixture<NodenameEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodenameEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodenameEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
