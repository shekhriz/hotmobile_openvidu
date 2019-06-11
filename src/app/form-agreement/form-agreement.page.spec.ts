import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAgreementPage } from './form-agreement.page';

describe('FormAgreementPage', () => {
  let component: FormAgreementPage;
  let fixture: ComponentFixture<FormAgreementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAgreementPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAgreementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
