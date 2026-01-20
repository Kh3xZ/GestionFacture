import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ClientModal } from './components/clients/clients.modal';
import { ModalService } from './services/modals.service';

@Component({
  selector: 'layout-root',
  imports: [RouterOutlet, SidebarComponent, ClientModal],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class layout {
  protected readonly title = signal('Gestion de Factures');
  constructor(public modalservice: ModalService) {}
}
