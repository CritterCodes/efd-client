import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RepairsComponent } from '../repairs/repairs.component';
import { UsersComponent } from '../users/users.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule, RepairsComponent, UsersComponent]
})
export class AdminDashComponent {}
