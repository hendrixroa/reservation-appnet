import {Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {CreateReservation} from "../models/create.reservation.model";

@Injectable()
export class ReservationService {
  private readonly baseUrl: string;
  private nameEndpoint: string = 'reservations';

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl + this.nameEndpoint;
  }

  list(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  detail(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  create(createReservationPayload: CreateReservation) : Observable<any> {
    return this.http.post<any>(this.baseUrl, createReservationPayload);
  }

  update(id: number, updateReservationPayload: CreateReservation) {
    return this.http.put<any>(`${this.baseUrl}/${id}`, updateReservationPayload);
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
