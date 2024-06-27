import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Repair } from '../repair';
import { RepairDetailsComponent } from '../repair-details/repair-details.component';
import { RepairService } from '../repair.service';
import { RouterLink } from '@angular/router';
import { AuthGuard } from '../auth.guard';

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
  filteredRepairs: Repair[] = [];
  statusFilters: Set<string> = new Set();

  constructor(private repairService: RepairService, public authGaurd: AuthGuard) {}

  getRepairs = (): void => {
    this.repairService.getRepairs().subscribe((repairs) => {
      this.repairs = repairs;
      this.filterRepairs(); // Apply initial filtering
    });
  };

  toggleFilter(event: any): void {
    const status = event.target.value;
    if (event.target.checked) {
      this.statusFilters.add(status);
    } else {
      this.statusFilters.delete(status);
    }
    this.filterRepairs();
  }

  filterRepairs(): void {
    if (this.statusFilters.size > 0) {
      this.filteredRepairs = this.repairs.filter(repair => this.statusFilters.has(repair.status));
    } else {
      this.filteredRepairs = this.repairs;
    }
  }

  ngOnInit(): void {
    console.log('Invoked ngOnInit');
    this.getRepairs();
  }
}
