import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentVisualizationComponent } from './department-visualization.component';

describe('DepartmentVisualizationComponent', () => {
  let component: DepartmentVisualizationComponent;
  let fixture: ComponentFixture<DepartmentVisualizationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepartmentVisualizationComponent]
    });
    fixture = TestBed.createComponent(DepartmentVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
