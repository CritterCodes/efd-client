import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RepairService } from '../repair.service';
import { Repair } from '../repair';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-repairs-create',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './new-repair.component.html',
  styleUrls: ['./new-repair.component.css'] // Note the correct plural form
})
export class NewRepairComponent {
  repair: Repair = {
    repairID: '',
    userID: '',
    description: '',
    picture: '',
    receivedDate: '',
    promiseDate: '',
    metalType: '',
    repairTasks: [], // Initialize as an empty array
    status: 'pending'
  };
  task = '';
  imagePreview: string | ArrayBuffer | null = '';

  constructor(private repairService: RepairService,
              private router: Router) {}

  addTask(task: string): void {
    if (task) {
      this.repair.repairTasks.push(task);
      this.task = ''; // Clear the input after adding the task
    }
  }

  removeTask(index: number): void {
    this.repair.repairTasks.splice(index, 1);
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.repair.picture = reader.result as string; // Store the base64 string or URL
      };
      reader.readAsDataURL(file);
    }
  }

  createRepair(): void {
    this.repairService.createRepair(this.repair)
      .subscribe(() => {
        this.router.navigate(['/repairs']);
      });
  }
}
