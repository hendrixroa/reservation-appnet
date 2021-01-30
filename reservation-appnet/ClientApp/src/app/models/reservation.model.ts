export class CreateReservation {
  Id?: string;
  Title: string;
  Description: string;
}

export class ListReservation extends CreateReservation {
  CreatedAt: Date;
}