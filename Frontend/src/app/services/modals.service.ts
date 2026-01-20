import { Injectable } from "@angular/core";
import { Facture } from "../models/facture.model";
import { Client } from "../models/client.model";

@Injectable({
  providedIn: 'root'
})

export class ModalService {
  facturemodal: boolean;
  clientModal: boolean;

  private facture!: Facture;
  private client!: Client;

  constructor() {
    this.facturemodal = false;
    this.clientModal = false;
  }

  getFacture(): Facture {
    return this.facture;
  }

  setFacture(facture: Facture): void {
    this.facture = facture;
  }

  getClient(): Client {
    return this.client;
  }
  setClient(client: Client): void {
    this.client = client;
  }
}