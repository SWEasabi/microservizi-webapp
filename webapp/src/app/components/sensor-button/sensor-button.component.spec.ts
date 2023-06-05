import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorButtonComponent } from './sensor-button.component';

describe('SensorButtonComponent', () => {
  let component: SensorButtonComponent;
  let fixture: ComponentFixture<SensorButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SensorButtonComponent]
    });
    fixture = TestBed.createComponent(SensorButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
