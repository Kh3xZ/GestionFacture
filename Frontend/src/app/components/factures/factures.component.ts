import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Facture } from '../../models/facture.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-Factures',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './factures.component.html',
  styleUrls: ['./factures.component.css']
})
export class FacturesComponent {
    constructor(private apiService: ApiService) {}
    factures: Facture[] = [];
    ngOnInit(){
    this.apiService.getFactures().subscribe((data: Facture[]) => {
        this.factures = data;
    });
    }  
}
