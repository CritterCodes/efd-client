import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { Collector } from '../collector';
import { FormsModule } from '@angular/forms';
import { CollectorService } from '../collector.service';

@Component({
  selector: 'app-collector-detail',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './collector-profile.component.html',
  styleUrls: ['./collector-profile.component.css'] // Corrected to styleUrls
})
export class CollectorProfileComponent implements OnInit {
  collector?: Collector;
  imagePreview: string | ArrayBuffer | null = '';
  isEditing: boolean = false; // Add a flag for editing mode

  constructor(
    private route: ActivatedRoute,
    private collectorService: CollectorService
  ) {}

  getCollector(): void {
    const collectorID = this.route.snapshot.paramMap.get('collectorID');
    console.log('Collector ID:', collectorID); // Add this line
    if (collectorID) {
      this.collectorService.getCollector(collectorID)
        .subscribe(
          (collector: Collector) => {
            this.collector = collector;
            console.log('Collector data:', this.collector); // Debugging
          },
          (error) => {
            console.error('Error fetching collector data:', error); // Error handling
          }
        );
    }
  }
  

  updateCollector(): void {
    if (this.collector) {
      this.collectorService.updateCollector(this.collector.collectorID, this.collector)
        .subscribe(() => {
          this.toggleEdit();
        });
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (this.collector) {
          this.imagePreview = reader.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  ngOnInit(): void {
    this.getCollector();
  }
  
}
