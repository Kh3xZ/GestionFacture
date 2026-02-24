import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { forkJoin, map, switchMap, of } from 'rxjs';

import { Facture } from '../../models/facture.model';
import { Client } from '../../models/client.model';
import { ApiService } from '../../services/api.service';
import { ModalService } from '../../services/modals.service';

@Component({
  selector: 'app-Factures',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './factures.component.html',
  styleUrls: ['./factures.component.css']
})
export class FacturesComponent implements OnInit {
  factureEdit!: Facture;
  factureAdd!: Facture;
  factures: Facture[] = [];
  Clients: Client[] = [];
  searchQuery: string = '';

  constructor(
    private apiService: ApiService,
    private cd: ChangeDetectorRef,
    public modalservice: ModalService
  ) {}

  ngOnInit() {
    this.apiService.getClients().subscribe((data: Client[]) => {
      this.Clients = data;
    });
    this.loadFactures();
  }

  loadFactures() {
    this.apiService.getFactures().pipe(
      switchMap((factures: Facture[]) => {
        if (factures.length === 0) return of([]);
        const detailRequests = factures.map(f =>
          forkJoin({
            client: this.apiService.getClientName(String(f.client_id)),
            total: this.apiService.getTotalAmount(String(f.id))
          }).pipe(
            map(res => ({
              ...f,
              client_name: (res.client as any).name,
              total_amount: (res.total as any).total_amount
            }))
          )
        );
        return forkJoin(detailRequests);
      })
    ).subscribe({
      next: (fullFactures) => {
        this.factures = fullFactures as Facture[];
        this.cd.detectChanges();
      },
      error: (err) => console.error('Error loading factures:', err)
    });
  }

  filteredFactures(): Facture[] {
    const q = this.searchQuery.toLowerCase().trim();
    if (!q) return this.factures;
    return this.factures.filter(f =>
      f.client_name?.toLowerCase().includes(q) ||
      f.status?.toLowerCase().includes(q) ||
      String(f.id).includes(q)
    );
  }

  openFactureModalEdit(facture: Facture) {
    this.modalservice.facturemodal = true;
    this.modalservice.factureType = 'edit';
    this.factureEdit = { ...facture };
  }

  openAdd() {
    this.factureAdd = {
      id: Date.now(),
      client_id: '-1',
      issue_date: new Date(),
      due_date: new Date(),
      status: 'pending',
      total_amount: 0,
      client_name: ''
    };
    this.modalservice.facturemodal = true;
    this.modalservice.factureType = 'add';
  }

  add() {
    const newFacture = { ...this.factureAdd };
    this.apiService.addFacture(newFacture).subscribe({
      next: () => { this.loadFactures(); this.close(); },
      error: (err) => console.error('Error adding facture:', err)
    });
  }

  close() {
    this.modalservice.facturemodal = false;
  }

  delete(facture: Facture) {
    this.apiService.supprimerFacture(facture).subscribe({
      next: () => this.loadFactures(),
      error: (err) => console.error('Error deleting facture:', err)
    });
  }

  edit() {
    const newFacture = { ...this.factureEdit };
    this.apiService.editFacture(newFacture).subscribe({
      next: () => { this.loadFactures(); this.close(); },
      error: (err) => console.error('Error editing facture:', err)
    });
  }
}