import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  categories: any[] = [];
  name!:String | null
  constructor(private authService:AuthService,private router:Router){}
  ngOnInit(): void {
    this.name = localStorage.getItem("user_Name")
  }
  logout() {
  this.authService.logout().subscribe({
    next: () => {
      localStorage.removeItem('user_Name');
      localStorage.removeItem('user_Email');
      this.router.navigate(['/login']);
    },
    error: () => {
      alert('Logout failed');
    }
  });
}

}