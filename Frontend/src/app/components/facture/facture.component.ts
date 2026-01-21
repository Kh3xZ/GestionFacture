import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Import Router
import { ApiService } from '../../services/api.service';
import { Service } from '../../models/service.model';
import { ModalService } from '../../services/modals.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-facture',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {
  factureid: string = "";
  services: Service[] = [];
  serviceEdit!: Service;
  serviceAdd!: Service;
  constructor(public modalservice:ModalService,private router: Router,private apiService: ApiService,private cd: ChangeDetectorRef) {}

  ngOnInit(): void {    
    this.factureid = this.router.url.split("/")[3]
    this.apiService.getServices(this.factureid).subscribe((data: Service[]) => {
            this.services = data;
            this.cd.detectChanges();
        });
    this.serviceAdd = {
        id:Date.now(),
        facture_id:Number(this.factureid),
        service:"",
        description:"",
        type:"",
        prix:0.00
    }
  }
  openEditSection(service:Service){
    this.modalservice.serviceModal = true;
    this.modalservice.serviceType = "edit"
    this.serviceEdit = service
  }
  close() {
  this.modalservice.serviceModal = false;
  // Reset serviceAdd to a blank state
  this.serviceAdd = {
    id: Date.now(),
    facture_id: Number(this.factureid),
    service: "",
    description: "",
    type: "",
    prix: 0.00
  };
}
 openAjouter(){
        this.serviceAdd = {
        id: Date.now(),
        service: "",
        description: "",
        type: "",
        prix: 0.00,
        facture_id: Number(this.factureid)
        }
        this.modalservice.serviceModal = true;
        this.modalservice.serviceType = "ajouter"
    }

    ajouter() {
    if (!this.serviceAdd.service || !this.serviceAdd.prix) return;
    const newService = { ...this.serviceAdd };
    this.apiService.addService(newService).subscribe({
        next: (res) => {
            this.services.push(res.data || newService); 
            this.close();
            this.cd.detectChanges();
    },
        error: (err) => console.error("Error adding service:", err)
  });
}

modifier() {
    if (!this.serviceEdit.service || !this.serviceEdit.prix) return;
    const newService = { ...this.serviceEdit };
    this.apiService.editService(newService).subscribe({
        next: (res) => {
            this.apiService.getServices(this.factureid).subscribe((data: Service[]) => {
                this.services = data;
                this.cd.detectChanges();
            });
            this.close();
    },
        error: (err) => console.error("Error adding service:", err)
  });
}

    supprimer(service:Service){
        this.apiService.supprimerService(service).subscribe({
        next: (res) => {
            this.apiService.getServices(this.factureid).subscribe((data: Service[]) => {
                this.services = data;
                this.cd.detectChanges();
            });
            this.close();
    },
        error: (err) => console.error("Error adding service:", err)
  });
    }


}