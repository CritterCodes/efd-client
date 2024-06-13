import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [RouterModule, FormsModule] // Import necessary modules for standalone component
})
export class SignupComponent {
  username: string = '';
  password: string = '';
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  phoneNumber: string = '';
  accountType: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  signup(): void {
    const userData = {
      username: this.username,
      password: this.password,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      accountType: this.accountType
    };

    this.authService.register(userData).subscribe(
      response => {
        alert('Registration successful. Please login.');
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Signup failed', error);
        alert('Signup failed. Please try again.');
      }
    );
  }
}
