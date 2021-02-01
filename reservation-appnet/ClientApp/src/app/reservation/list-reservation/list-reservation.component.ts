import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { ListReservation } from "../../models/reservation.model";
import { ReservationService } from "../../services/reservation.service";

@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrls: ['./list-reservation.component.css']
})
export class ListReservationComponent implements OnInit {
  pages: number[];
  limit: number = 5;
  currentPage: number = 1;
  disabledPrevious: boolean = false;
  disabledNext: boolean = false;
  reservations: ListReservation[];

  constructor(private router: Router, private reservationService: ReservationService) { }

  ngOnInit() {
    this.list();
  }

  checkDisablePaginators() {
    if (this.currentPage <= 1) {
      this.disabledPrevious = true;
    } else {
      this.disabledPrevious = false;
    }
    const lastPage = this.pages[this.pages.length - 1];
    if (this.currentPage == lastPage) {
      this.disabledNext = true;
    } else {
      this.disabledNext = false;
    }
  }

  list() {
    this.reservationService.list({ Page: this.currentPage, Limit: this.limit})
      .subscribe(data => {
        this.reservations = data.Items.map(reservation => {
          return {
            Id: reservation.Id,
            Title: reservation.Title,
            Rating: reservation.Rating,
            Favorite: reservation.Favorite ? 1 : 0,
            CreatedAt: reservation.CreatedAt,
          };
        });
        this.pages = [...Array(data.Pages).keys()].map(page => page + 1);
        this.checkDisablePaginators();
      });
  }

  add() {
    this.router.navigate(['add-reservation']);
  }

  edit(id: number) {
    this.router.navigate([`edit-reservation/${id}`]);
  }

  delete(id: number) {
    this.reservationService.delete(id)
      .subscribe(() => {
        this.list();
      });
  }

  rateChange(reservation: ListReservation){
    this.reservationService
      .addRating(Number(reservation.Id), { Rating: reservation.Rating })
      .subscribe(() => {
        this.list();
      });
  }

  favoriteChange(reservation: ListReservation){
    let Favorite = false;
    if(reservation.Favorite) {
      Favorite = true;
    }
    this.reservationService
      .addFavorite(Number(reservation.Id), { Favorite })
      .subscribe(() => {
        this.list();
      });
  }

  goPage(page: number) {
    this.currentPage = page;
    this.list();
  }

  goPrevious(){
    this.goPage(this.currentPage - 1);
  }

  goNext() {
    this.goPage(this.currentPage + 1);
  }
}
