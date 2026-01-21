export class Facture {
    id!: number;
    client_id!: string;
    issue_date!: Date;
    due_date!: Date;
    status!: string;
    total_amount!: number;
    client_name!: String;
}