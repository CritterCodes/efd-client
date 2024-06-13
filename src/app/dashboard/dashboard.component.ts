import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { AuthService } from '../auth.service';
import { SideBarComponent } from '../side-bar/side-bar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgFor, NgIf, SideBarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userType: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    //this.userType = this.authService.getUserType() || '';
    this.configureSidebar(this.userType);
  }

  isSidebarOpen = false;

  handleSidebarToggle(isOpen: boolean) {
    this.isSidebarOpen = isOpen;
  }

  configureSidebar(userType: string) {
    // Logic to configure the sidebar based on user type
    // This could include setting up different links or menu items
  }
}
