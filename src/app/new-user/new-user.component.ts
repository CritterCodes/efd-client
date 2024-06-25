import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {
  user: Partial<User> = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  };

  constructor(private userService: UserService, private router: Router) {}

  createUser(): void {
    this.userService.createUser(this.user as User).subscribe(() => {
      this.router.navigate(['/dashboard/users']);
    });
  }
}
