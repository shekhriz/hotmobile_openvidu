import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyAgreementPage } from './policy-agreement.page';

describe('PolicyAgreementPage', () => {
  let component: PolicyAgreementPage;
  let fixture: ComponentFixture<PolicyAgreementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyAgreementPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyAgreementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
