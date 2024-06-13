// src/app/connect/connect.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { CollectorService } from '../collector.service';
import { Collector } from '../collector';

@Component({
  selector: 'app-connect',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements OnInit {
  collectorCardID: any = null;
  errorMessage: string = '';
  user: any = null;
  collector: Collector = {
    collectorID: '',
    userID: '',
    username: '',
    fullName: '',
    picture: '',
    email: '',
    phoneNumber: '',
    bio: '',
    websites: [''],
    socials: ['']
  }

  constructor(
    private collectorService: CollectorService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    console.log('User info:', this.user); // Debugging line
    this.collectorCardID = this.route.snapshot.paramMap.get('collectorID');
  }

  connect(): void {
    this.collector.collectorID = this.collectorCardID;
    this.collector.userID = this.user.userID;
    console.log('connect has been called');
    this.collectorService.createCollector(this.collector)
      .subscribe(() => {
        this.router.navigate(['/repairs']);
      });
  }
}
