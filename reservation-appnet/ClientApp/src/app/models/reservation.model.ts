export class CreateReservation {
  Id?: string;
  Title: string;
  Description: string;
}

export class ListReservation {
  Id?: string;
  Title: string;
  Rating: number;
  Favorite: boolean;
  CreatedAt: Date;
}