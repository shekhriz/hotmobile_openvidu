import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateSkillsPage } from './rate-skills.page';

describe('RateSkillsPage', () => {
  let component: RateSkillsPage;
  let fixture: ComponentFixture<RateSkillsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateSkillsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateSkillsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
