import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoRecPage } from './video-rec.page';

describe('VideoRecPage', () => {
  let component: VideoRecPage;
  let fixture: ComponentFixture<VideoRecPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoRecPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoRecPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
