import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivmodalPage } from './divmodal.page';

describe('DivmodalPage', () => {
  let component: DivmodalPage;
  let fixture: ComponentFixture<DivmodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivmodalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivmodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
