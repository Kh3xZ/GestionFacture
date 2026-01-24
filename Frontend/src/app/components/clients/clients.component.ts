import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Client } from '../../models/client.model';
import { ApiService } from '../../services/api.service';
import { ChangeDetectorRef } from '@angular/core';
import { ModalService } from '../../services/modals.service';
import { ClientModal } from './clients.modal';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-Clients',
  standalone: true,
  imports: [CommonModule,ClientModal,FormsModule],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent {
    clients : Client[] = [];
    clientEdit!: Client;
    clientAdd!: Client;
    constructor(private apiService: ApiService, private cd: ChangeDetectorRef,public modalservice: ModalService) {}
    ngOnInit(){
        this.loadClients()
    }
loadClients(){
    this.apiService.getClients().subscribe((data: Client[]) => {
        this.clients = data;
        this.cd.detectChanges();
    });
    }
openClientModalEdit(client:Client){
    this.modalservice.clientModal = true;
    this.modalservice.clientType = "edit";
    this.clientEdit = { ...client };
  }
  close(){
    this.modalservice.clientModal = false;
  }

  edit(){
    const newClient = {... this.clientEdit}
    console.log(newClient)
     this.apiService.editClient(newClient).subscribe({
      next: (res) => {
        console.log(res)
                  this.loadClients()
                  this.close();
          },
              error: (err) => console.error("Error editing Facture:", err)
        }

     )
  }
  remove(){

  }
  add() {
  const newClient = { ...this.clientAdd};
  console.log(newClient);
  this.apiService.addClient(newClient).subscribe({
    next: (res) => {
      console.log(res);
      this.loadClients();
      this.close();
    },
    error: (err) => console.error("Error adding Client:", err)
  });
  this.clientAdd = {
    email: "",
    name: "",
    telephone: "",
    address: ""
  };
}


  openClientModalAdd(){
    this.modalservice.clientModal = true;
    this.modalservice.clientType = "add";
    this.clientAdd = {
      email:"",
      name:"",
      telephone:"",
      address:""
    }
  }

  delete(client:Client){
              this.apiService.deleteClient(client).subscribe({
              next: (res) => {
                  this.loadClients()
              },
              error: (err) => console.error("Error deleting client:", err)
        });
    }

}
