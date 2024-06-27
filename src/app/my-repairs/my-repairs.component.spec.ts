import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRepairsComponent } from './my-repairs.component';

describe('MyRepairsComponent', () => {
  let component: MyRepairsComponent;
  let fixture: ComponentFixture<MyRepairsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyRepairsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyRepairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
