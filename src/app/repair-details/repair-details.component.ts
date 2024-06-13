import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-repair-detail',
  standalone: true,
  imports: [NgIf],
  templateUrl: './repair-details.component.html',
  styleUrls: ['./repair-details.component.css'] // Corrected to styleUrls
})
export class RepairDetailsComponent implements OnInit {
  repairID: string | null = null;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getRepairID();
  }

  getRepairID(): void {
    this.repairID = this.route.snapshot.paramMap.get('repairID');
    console.log(this.route.snapshot.paramMap);
  }
}
