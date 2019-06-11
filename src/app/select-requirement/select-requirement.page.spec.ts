import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRequirementPage } from './select-requirement.page';

describe('SelectRequirementPage', () => {
  let component: SelectRequirementPage;
  let fixture: ComponentFixture<SelectRequirementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectRequirementPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectRequirementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
