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
    localStorage.removeItem('user_Name');
  this.apiService.login(this.email, this.mdp).subscribe({
    next: (res) => {
      if (res.success) {
        localStorage.setItem('user_Name', res.name);
        localStorage.setItem('user_Email', res.email);
        this.router.navigate(['/Factures']);
      } else {
        alert('Email or password incorrect');
      }
    },
    error: (err) => {
      console.error(err);
      alert('Login error or server not reachable');
    }
  });
}
}
