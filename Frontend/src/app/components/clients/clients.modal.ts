import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../services/modals.service';
import { Client } from '../../models/client.model';
import { ApiService } from '../../services/api.service';


@Component({
  standalone: true,
  selector: 'client-modal',
  templateUrl: './clients.modal.html',
  styleUrls: ['./clients.modal.css'],
  imports: [CommonModule,FormsModule]
})

export class ClientModal {
  client:Client
  constructor(private modalservice:ModalService,private ApiService:ApiService) { 
    this.client = this.modalservice.getClient();
  }

  close(){
    this.modalservice.clientModal = false;
  }

  modifier(){
  }

  ajouter(){
  }

}
