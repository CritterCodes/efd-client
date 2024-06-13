import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { Repair } from '../repair';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RepairService } from '../repair.service';
import { RepairNavComponent } from '../repair-nav/repair-nav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-repair',
  standalone: true,
  imports: [RouterOutlet, NgIf, NgFor, FormsModule, ReactiveFormsModule, RepairNavComponent],
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.css']
})
export class RepairComponent implements OnInit {
  repair?: Repair;

  constructor(
    private route: ActivatedRoute,
    private repairService: RepairService
  ) {}

  getRepair(): void {
    const repairId = this.route.snapshot.paramMap.get('repairID');
    if (repairId) {
      this.repairService.getRepair(repairId).subscribe((repair: Repair) => {
        this.repair = repair;
      });
    }
  }

  ngOnInit(): void {
    this.getRepair();
  }
}