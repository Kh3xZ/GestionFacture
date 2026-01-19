import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';


@Component({
  selector: 'layout-root',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class layout {
  protected readonly title = signal('Gestion de Factures');
}
