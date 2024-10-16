import { Component } from '@angular/core';
import { UserService, User } from '../user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  username = '';
  password = '';

  constructor(private userService: UserService, private router: Router) {}

  register() {
    let newUser: User = { username: this.username, password: this.password };
    this.userService.register(newUser).subscribe(user => {
      alert('Registration successful!');
      this.router.navigate(['/login']);
    });
  }
}
