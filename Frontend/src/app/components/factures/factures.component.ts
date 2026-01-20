import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Facture } from '../../models/facture.model';
import { ApiService } from '../../services/api.service';
import { ChangeDetectorRef } from '@angular/core';
import { ModalService } from '../../services/modals.service';

@Component({
  selector: 'app-Factures',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './factures.component.html',
  styleUrls: ['./factures.component.css']
})
export class FacturesComponent {
    constructor(private apiService: ApiService, private cd: ChangeDetectorRef,public modalservice:ModalService) {}
    factures: Facture[] = [];
    ngOnInit(){
    this.apiService.getFactures().subscribe((data: Facture[]) => {
        this.factures = data;
        this.cd.detectChanges();
    });
    } 
    openFactureModal(facture:Facture){
        this.modalservice.facturemodal = true
        this.modalservice.setFacture(facture)
    }
    close(){
        this.modalservice.facturemodal=false
    }
}
