import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairNavComponent } from './repair-nav.component';

describe('RepairNavComponent', () => {
  let component: RepairNavComponent;
  let fixture: ComponentFixture<RepairNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepairNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RepairNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
