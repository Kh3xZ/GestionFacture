import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin, map, switchMap, of } from 'rxjs';

import { Facture } from '../../models/facture.model';
import { Client } from '../../models/client.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  factures: Facture[] = [];
  clients: Client[] = [];

  // Stats
  totalFactures = 0;
  totalClients = 0;
  totalRevenue = 0;
  paidCount = 0;
  pendingCount = 0;
  overdueCount = 0;
  recentFactures: Facture[] = [];

  isLoading = true;

  constructor(
    private apiService: ApiService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.isLoading = true;

    forkJoin({
      factures: this.apiService.getFactures(),
      clients: this.apiService.getClients()
    }).pipe(
      switchMap(({ factures, clients }) => {
        this.clients = clients;
        this.totalClients = clients.length;

        if (factures.length === 0) {
          return of({ factures: [], clients });
        }

        const detailRequests = factures.map((f: Facture) =>
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

        return forkJoin(detailRequests).pipe(
          map(fullFactures => ({ factures: fullFactures, clients }))
        );
      })
    ).subscribe({
      next: ({ factures }) => {
        this.factures = factures as Facture[];
        this.computeStats();
        this.isLoading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Error loading dashboard data:', err);
        this.isLoading = false;
        this.cd.detectChanges();
      }
    });
  }

  computeStats() {
    this.totalFactures = this.factures.length;

    this.paidCount = this.factures.filter(f => f.status === 'paid').length;
    this.pendingCount = this.factures.filter(f => f.status === 'pending').length;
    this.overdueCount = this.factures.filter(f => f.status === 'overdue').length;

    this.totalRevenue = this.factures
      .filter(f => f.status === 'paid')
      .reduce((sum, f) => sum + Number(f.total_amount || 0), 0);

    // Sort by issue_date descending and take last 5
    this.recentFactures = [...this.factures]
      .sort((a, b) => new Date(b.issue_date).getTime() - new Date(a.issue_date).getTime())
      .slice(0, 5);
  }

  getPaidPercent(): number {
    if (this.totalFactures === 0) return 0;
    return Math.round((this.paidCount / this.totalFactures) * 100);
  }

  getPendingPercent(): number {
    if (this.totalFactures === 0) return 0;
    return Math.round((this.pendingCount / this.totalFactures) * 100);
  }

  getOverduePercent(): number {
    if (this.totalFactures === 0) return 0;
    return Math.round((this.overdueCount / this.totalFactures) * 100);
  }
}