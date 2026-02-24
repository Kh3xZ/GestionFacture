import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Client } from '../../models/client.model';
import { ApiService } from '../../services/api.service';
import { ModalService } from '../../services/modals.service';
import { ClientModal } from './clients.modal';

@Component({
  selector: 'app-Clients',
  standalone: true,
  imports: [CommonModule, ClientModal, FormsModule],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  clientEdit!: Client;
  clientAdd!: Client;
  searchQuery: string = '';

  constructor(
    private apiService: ApiService,
    private cd: ChangeDetectorRef,
    public modalservice: ModalService
  ) {}

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.apiService.getClients().subscribe((data: Client[]) => {
      this.clients = data;
      this.cd.detectChanges();
    });
  }

  filteredClients(): Client[] {
    const q = this.searchQuery.toLowerCase().trim();
    if (!q) return this.clients;
    return this.clients.filter(c =>
      c.name?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q) ||
      c.telephone?.toLowerCase().includes(q) ||
      c.address?.toLowerCase().includes(q)
    );
  }

  openClientModalEdit(client: Client) {
    this.modalservice.clientModal = true;
    this.modalservice.clientType = 'edit';
    this.clientEdit = { ...client };
  }

  openClientModalAdd() {
    this.modalservice.clientModal = true;
    this.modalservice.clientType = 'add';
    this.clientAdd = { email: '', name: '', telephone: '', address: '' };
  }

  close() {
    this.modalservice.clientModal = false;
  }

  edit() {
    const newClient = { ...this.clientEdit };
    this.apiService.editClient(newClient).subscribe({
      next: () => { this.loadClients(); this.close(); },
      error: (err) => console.error('Error editing client:', err)
    });
  }

  add() {
    const newClient = { ...this.clientAdd };
    this.apiService.addClient(newClient).subscribe({
      next: () => { this.loadClients(); this.close(); },
      error: (err) => console.error('Error adding client:', err)
    });
    this.clientAdd = { email: '', name: '', telephone: '', address: '' };
  }

  delete(client: Client) {
    this.apiService.deleteClient(client).subscribe({
      next: () => this.loadClients(),
      error: (err) => console.error('Error deleting client:', err)
    });
  }
}