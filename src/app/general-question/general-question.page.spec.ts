import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralQuestionPage } from './general-question.page';

describe('GeneralQuestionPage', () => {
  let component: GeneralQuestionPage;
  let fixture: ComponentFixture<GeneralQuestionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralQuestionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralQuestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
