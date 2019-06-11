import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonHeaderPage } from './common-header.page';

describe('CommonHeaderPage', () => {
  let component: CommonHeaderPage;
  let fixture: ComponentFixture<CommonHeaderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonHeaderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonHeaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
