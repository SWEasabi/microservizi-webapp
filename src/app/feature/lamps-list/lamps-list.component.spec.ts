import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LampsListComponent } from './lamps-list.component';

describe('LampsListComponent', () => {
  let component: LampsListComponent;
  let fixture: ComponentFixture<LampsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ LampsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LampsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
