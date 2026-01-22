import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Client } from '../../models/client.model';
import { ApiService } from '../../services/api.service';
import { ChangeDetectorRef } from '@angular/core';
import { ModalService } from '../../services/modals.service';
import { ClientModal } from './clients.modal';

@Component({
  selector: 'app-Clients',
  standalone: true,
  imports: [CommonModule,ClientModal],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent {
    clients : Client[] = [];
    constructor(private apiService: ApiService, private cd: ChangeDetectorRef,private modalservice: ModalService) {}
    ngOnInit(){
    this.apiService.getClients().subscribe((data: Client[]) => {
        this.clients = data;
        this.cd.detectChanges();
    });
    
}
openClientModal(client: Client){
    this.modalservice.setClient(client);
    this.modalservice.clientModal = true;
}
}
