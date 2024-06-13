import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthGuard } from '../auth.guard';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  user: any = null;

  constructor(private authService: AuthService, private router: Router, public authGaurd: AuthGuard) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    console.log('User info:', this.user); // Debugging line
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  isSidebarOpen = false;

  @Output() sidebarToggled = new EventEmitter<boolean>();

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.sidebarToggled.emit(this.isSidebarOpen);
  }

}
