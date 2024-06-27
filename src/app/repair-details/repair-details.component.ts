import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Repair } from '../repair';
import { RepairService } from '../repair.service';

@Component({
  selector: 'app-repair-detail',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, ReactiveFormsModule],
  templateUrl: './repair-details.component.html',
  styleUrls: ['./repair-details.component.css']
})
export class RepairDetailsComponent implements OnInit {
  repairID: string | null = null;
  repair?: Repair;
  isEditing: boolean = false; // Add a flag for editing mode
  repairForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private repairService: RepairService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.repairForm = this.fb.group({
      description: [''],
      userID: [''],
      receivedDate: [''],
      promiseDate: [''],
      metalType: ['']
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
      this.repairForm.patchValue({
        description: repair.description,
        userID: repair.userID,
        receivedDate: repair.receivedDate,
        promiseDate: repair.promiseDate,
        metalType: repair.metalType
      });
    });
  }

  updateRepair(): void {
    if (this.repair) {
      const updatedRepair = { ...this.repair, ...this.repairForm.value };
      this.repairService.updateRepair(this.repair.repairID, updatedRepair)
        .subscribe(() => {
          this.isEditing = false; // Exit edit mode after saving
        });
    }
  }

  deleteRepair(): void {
    if (this.repair) {
      this.repairService.deleteRepair(this.repair.repairID).subscribe(() => {
        this.router.navigate(['/dashboard/repairs']);
      });
    }
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  formatTask(task: any): string {
    return `${task.taskID} ${task.title}`;
  }

  navigateToReceive(): void {
    this.router.navigate([`/dashboard/repairs/${this.repairID}/receiving`]);
  }
}
