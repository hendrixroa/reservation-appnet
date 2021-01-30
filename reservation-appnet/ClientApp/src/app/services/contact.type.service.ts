import {Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";

@Injectable()
export class ContactTypeService {
  private readonly baseUrl: string;
  private nameEndpoint: string = 'contact/types';

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl + this.nameEndpoint;
  }

  list(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  detail(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  create(createContactTypePayload: { Description: string }) : Observable<any> {
    return this.http.post<any>(this.baseUrl, createContactTypePayload);
  }

  update(id: number, updateContactTypePayload: { Description: string }) {
    return this.http.put<any>(`${this.baseUrl}/${id}`, updateContactTypePayload);
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
