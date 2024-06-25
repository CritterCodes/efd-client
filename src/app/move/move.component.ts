import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { RepairService } from '../repair.service';
import { Repair } from '../repair';

@Component({
  selector: 'app-move',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, ReactiveFormsModule],
  templateUrl: './move.component.html',
  styleUrls: ['./move.component.css']
})
export class MoveComponent implements OnInit {
  @ViewChild('repairIDInput') repairIDInput!: ElementRef;
  moveForm: FormGroup;
  repairIDs: string[] = [];

  constructor(
    private repairService: RepairService,
    private fb: FormBuilder
  ) {
    this.moveForm = this.fb.group({
      newLocation: [''],
      repairID: ['']
    });
  }

  ngOnInit(): void {
    // Any necessary initialization
  }

  addRepairID(): void {
    const repairID = this.moveForm.get('repairID')?.value;
    if (repairID && !this.repairIDs.includes(repairID)) {
      this.repairIDs.push(repairID);
      this.moveForm.get('repairID')?.reset();
    }
  }

  removeRepairID(repairID: string): void {
    this.repairIDs = this.repairIDs.filter(id => id !== repairID);
  }

  moveRepairs(): void {
    const newLocation = this.moveForm.get('newLocation')?.value;
    this.repairIDs.forEach(repairID => {
      this.repairService.updateRepair(repairID, { status: newLocation } as Repair).subscribe(() => {
        console.log(`Repair ${repairID} moved to ${newLocation}`);
      });
    });
    this.repairIDs = [];
    this.moveForm.reset();
    alert('Repairs moved successfully');
  }

  handleKeypress(event: KeyboardEvent, type: string): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (type === 'newLocation') {
        this.repairIDInput.nativeElement.focus(); // Move focus to repair ID input
      } else if (type === 'repairID') {
        this.addRepairID();
      }
    }
  }
}
