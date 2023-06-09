import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacialDetectionComponent } from './facial-detection.component';

describe('FacialDetectionComponent', () => {
  let component: FacialDetectionComponent;
  let fixture: ComponentFixture<FacialDetectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacialDetectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacialDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
