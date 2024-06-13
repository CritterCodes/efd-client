import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairTasksComponent } from './repair-tasks.component';

describe('RepairTasksComponent', () => {
  let component: RepairTasksComponent;
  let fixture: ComponentFixture<RepairTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepairTasksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RepairTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
