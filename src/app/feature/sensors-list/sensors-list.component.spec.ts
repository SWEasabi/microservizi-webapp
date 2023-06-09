import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorsListComponent } from './sensors-list.component';

describe('SensorsListComponent', () => {
  let component: SensorsListComponent;
  let fixture: ComponentFixture<SensorsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SensorsListComponent]
    });
    fixture = TestBed.createComponent(SensorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
