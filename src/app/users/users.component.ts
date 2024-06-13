import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { User } from '../user';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { UserService } from '../user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UpperCasePipe, FormsModule, NgFor, NgIf, UserDetailsComponent, RouterLink],  
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  selectedUser!: User;
  users: User[] = [];

  constructor(private userService: UserService) {}

  getUsers = (): void => {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  };

  deleteUser = (userID: string): void => {
    this.userService.deleteUser(userID).subscribe((res) => {
      this.getUsers();
    });
  }

  ngOnInit(): void {
    console.log('Invoked ngOnInit');
    this.getUsers();
  };
}
