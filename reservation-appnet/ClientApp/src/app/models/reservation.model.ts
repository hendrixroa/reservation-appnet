export class CreateReservation {
  Id?: string;
  Title: string;
  Description: string;
}

export class RatingReservation {
  Rating: number;
}

export class FavoriteReservation {
  Favorite: boolean;
}

export class ListReservation {
  Id?: string;
  Title: string;
  Rating: number;
  Favorite: boolean;
  CreatedAt: Date;
}