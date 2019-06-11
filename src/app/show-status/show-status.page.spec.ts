import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowStatusPage } from './show-status.page';

describe('ShowStatusPage', () => {
  let component: ShowStatusPage;
  let fixture: ComponentFixture<ShowStatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowStatusPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
