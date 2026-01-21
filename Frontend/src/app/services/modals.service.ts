import { Injectable } from "@angular/core";
import { Facture } from "../models/facture.model";
import { Client } from "../models/client.model";
import { Service } from "../models/service.model";

@Injectable({
  providedIn: 'root'
})

export class ModalService {
  facturemodal: boolean;
  clientModal: boolean;
  serviceModal: boolean;
  serviceType: String = "";
  factureType: String = "";

  private facture!: Facture;
  private client!: Client;
  private service!: Service;

  constructor() {
    this.facturemodal = false;
    this.clientModal = false;
    this.serviceModal = false;
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
  getService(): Service {
    return this.service;
  }
  setService(service:Service){
    this.service = service
  }
}