import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepairService } from '../repair.service';
import { Repair } from '../repair';
import { NgIf, NgFor} from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, ReactiveFormsModule],
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  repairID: string | null = null;
  repair: Repair | undefined;
  statusForm: FormGroup;
  isScanning: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private repairService: RepairService,
    private fb: FormBuilder
  ) {
    this.statusForm = this.fb.group({
      status: ['']
    });
  }

  ngOnInit(): void {
    this.getRepairID();
  }

  getRepairID(): void {
    this.route.parent?.paramMap.subscribe((paramMap) => {
      this.repairID = paramMap.get('repairID');
      if (this.repairID) {
        this.getRepair(this.repairID);
      }
    });
  }

  getRepair(repairID: string): void {
    this.repairService.getRepair(repairID).subscribe((repair: Repair) => {
      this.repair = repair;
      this.statusForm.patchValue({ status: repair.status });
    });
  }

  updateStatus(): void {
    if (this.repair) {
      this.repair.status = this.statusForm.get('status')?.value;
      this.repairService.updateRepair(this.repair.repairID, this.repair)
        .subscribe(() => {
          alert('Status updated successfully');
        });
    }
  }
}
