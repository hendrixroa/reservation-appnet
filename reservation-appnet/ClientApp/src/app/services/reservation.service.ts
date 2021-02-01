import {Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {CreateReservation, FavoriteReservation, RatingReservation} from "../models/reservation.model";

@Injectable()
export class ReservationService {
  private readonly baseUrl: string;
  private nameEndpoint: string = 'reservations';

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl + this.nameEndpoint;
  }

  list(params?: any): Observable<any> {
    return this.http.get(this.baseUrl, { params });
  }

  detail(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  create(contactId: number, createReservationPayload: CreateReservation) : Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/contact/${contactId}`, createReservationPayload);
  }

  update(id: number, updateReservationPayload: CreateReservation) {
    return this.http.put<any>(`${this.baseUrl}/${id}`, updateReservationPayload);
  }

  addFavorite(id: number, favoriteReservationPayload: FavoriteReservation) {
    return this.http.put<any>(`${this.baseUrl}/${id}/favorite`, favoriteReservationPayload);
  }

  addRating(id: number, ratingReservationPayload: RatingReservation) {
    return this.http.put<any>(`${this.baseUrl}/${id}/rating`, ratingReservationPayload);
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
