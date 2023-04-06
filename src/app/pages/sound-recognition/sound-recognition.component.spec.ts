import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundRecognitionComponent } from './sound-recognition.component';

describe('SoundRecognitionComponent', () => {
  let component: SoundRecognitionComponent;
  let fixture: ComponentFixture<SoundRecognitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoundRecognitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoundRecognitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
