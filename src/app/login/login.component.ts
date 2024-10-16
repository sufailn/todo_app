import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private userService: UserService, private router: Router) {}

  login() {
    this.userService.login(this.username, this.password).subscribe(users => {
      if (users.length > 0) {
        alert('Login successful!');
        this.router.navigate(['/dashboard']);
      } else {
        alert('Invalid credentials');
      }
    });
  }

  navigateToRegistration() {
    this.router.navigate(['/registration']);
  }
}
