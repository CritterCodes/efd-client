import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairsNavComponent } from './repairs-nav.component';

describe('RepairsNavComponent', () => {
  let component: RepairsNavComponent;
  let fixture: ComponentFixture<RepairsNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepairsNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RepairsNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
