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
  templateUrl: './repair-tasks.component.html',
  styleUrls: ['./repair-tasks.component.css']
})
export class RepairTasksComponent implements OnInit {
  repairID: string | null = null;
  repair?: Repair;
  isEditing: boolean = false; // Add a flag for editing mode
  repairForm: FormGroup;
  repairTasks: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private repairService: RepairService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.repairForm = this.fb.group({
      taskID: [''],
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

  addTask(): void {
    const task = this.repairForm.get('taskID')!.value;
    if (task) {
      this.repairTasks.push(task);
      this.repairForm.patchValue({ task: '' }); // Clear the input after adding the task
    }
  }

  removeTask(index: number): void {
    this.repair?.repairTasks.splice(index, 1);
  }

  getRepair(repairID: string): void {
    this.repairService.getRepair(repairID).subscribe((repair: Repair) => {
      this.repair = repair;
    });
  }

  addRepairTask(): void {
    const request = { repairTasks: this.repairTasks }
    if (this.repairID && this.repairTasks.length > 0) {
      this.repairService.addRepairTasks(this.repairID, request).subscribe((updatedRepair: Repair) => {
        this.repair = updatedRepair;
        this.repairTasks = []; // Clear the temporary storage after submission
        this.isEditing = false;
        this.getRepair(this.repairID!); // Refresh the repair tasks
      });
    }
  }

  deleteRepairTask(task: any): void {
    if (this.repair) {
      this.repairService.deleteRepairTask(this.repair.repairID, task.repairTaskID).subscribe(() => {
        this.router.navigate([`/dashboard/repairs/${this.repairID}/tasks`]);
        this.getRepair(this.repairID!); // Refresh the repair tasks
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
