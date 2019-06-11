import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoTimerModalPage } from './video-timer-modal.page';

describe('VideoTimerModalPage', () => {
  let component: VideoTimerModalPage;
  let fixture: ComponentFixture<VideoTimerModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoTimerModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoTimerModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
