import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Repair } from '../repair';
import { RepairDetailsComponent } from '../repair-details/repair-details.component';
import { RepairService } from '../repair.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-repairs',
  standalone: true,
  imports: [UpperCasePipe, FormsModule, NgFor, NgIf, RepairDetailsComponent, RouterLink],
  templateUrl: './repairs.component.html',
  styleUrls: ['./repairs.component.css']
})
export class RepairsComponent {
  selectedRepair!: Repair;
  repairs: Repair[] = [];

  constructor(private repairService: RepairService) {}

  getRepairs = (): void => {
    this.repairService.getRepairs().subscribe((repairs) => {
      this.repairs = repairs;
    });
  };

  ngOnInit(): void {
    console.log('Invoked ngOnInit');
    this.getRepairs();
  }


}
