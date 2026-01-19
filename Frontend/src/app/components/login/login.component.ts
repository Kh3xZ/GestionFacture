import { Component, NgModule } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
  constructor(private apiService: ApiService, private router: Router) {}
  email = '';
  mdp = '';

  login() {
  this.apiService.login(this.email, this.mdp).subscribe({
        next: (res) => {
            if (res.success) {
                localStorage.setItem('loggedIn', 'true');
                this.router.navigate(['/Dashboard']);
            } else {
                alert('Email or password incorrect');
            }
        },
        error: () => {
            alert('Login error');
        }
    });
  }
}
