import {Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {Contact} from "../models/contact.model";

@Injectable()
export class ContactService {
  private readonly baseUrl: string;
  private nameEndpoint: string = 'contacts';

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl + this.nameEndpoint;
  }

  list(params: any): Observable<any> {
    return this.http.get(this.baseUrl, { params });
  }

  detail(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  create(createContactPayload: Contact) : Observable<any> {
    return this.http.post<any>(this.baseUrl, createContactPayload);
  }

  update(id: number, updateContactPayload: Contact) {
    return this.http.put<any>(`${this.baseUrl}/${id}`, updateContactPayload);
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
