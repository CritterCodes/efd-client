import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RepairService } from '../repair.service';
import { Repair } from '../repair';

@Component({
  selector: 'app-receiving',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './receiving.component.html',
  styleUrls: ['./receiving.component.css']
})
export class ReceivingComponent implements OnInit {
  repairID: string | null = null;
  repair?: Repair;
  receivingForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = '';

  constructor(
    private route: ActivatedRoute,
    private repairService: RepairService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.receivingForm = this.fb.group({
      picture: [''],
      status: ['', Validators.required]
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
    });
  }

  
  printDetails(): void {
    const printContent = document.getElementById('print-section');
    const WindowPrt = window.open('', '', 'width=600,height=600');
    WindowPrt?.document.write(printContent?.innerHTML || '');
    WindowPrt?.document.close();
    WindowPrt?.focus();
    WindowPrt?.print();
    WindowPrt?.close();
  }
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.receivingForm.patchValue({ picture: file });
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
  
  receiveRepair(): void {
    if (this.repairID && this.receivingForm.valid) {
      const pictureFile = this.receivingForm.get('picture')!.value;
      const status = this.receivingForm.get('status')!.value;
  
      const updatedRepair: Repair = {
        ...this.repair!,
        status: status
      };
  
      // First, update the status
      this.repairService.updateRepair(this.repairID, updatedRepair).subscribe({
        next: () => {
          // Then, update the image
          const formData = new FormData();
          formData.append('repairImage', pictureFile);
          
          this.repairService.addImage(this.repairID!, formData).subscribe({
            next: () => {
              this.router.navigate(['/dashboard/repairs']);
            },
            error: (err) => console.error('Error updating image', err)
          });
        },
        error: (err) => console.error('Error updating status', err)
      });
      this.printDetails();
    }
  }
  
  
}
