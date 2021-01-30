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

  reservations: ListReservation[];

  constructor(private router: Router, private reservationService: ReservationService) { }

  ngOnInit() {
    this.list();
  }

  list() {
    this.reservationService.list()
      .subscribe(data => {
        this.reservations = data;
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
}
