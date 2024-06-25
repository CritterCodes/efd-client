import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { User } from '../user';
import { Task } from '../task';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, RouterLink],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'] // Corrected to styleUrls
})
export class UserDetailsComponent implements OnInit {
  user?: User;
  imagePreview: string | ArrayBuffer | null = '';
  isEditing: boolean = false; // Add a flag for editing mode

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  getUser(): void {
    const userId = this.route.snapshot.paramMap.get('userID');

    if (userId) {
      this.userService.getUser(userId)
        .subscribe((user: User) => {
          this.user = user;
        });
    }
  }

  updateUser(): void {
    if (this.user) {
      this.userService.updateUser(this.user.userID, this.user)
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
        if (this.user) {
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
    this.getUser();
  }
}
