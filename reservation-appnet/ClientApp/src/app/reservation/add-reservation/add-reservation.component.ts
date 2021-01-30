import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { CreateReservation } from "../../models/create.reservation.model";
import {ReservationService} from "../../services/reservation.service";

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css']
})
export class AddReservationComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private reservationService: ReservationService,
  ) { }

  addForm: FormGroup;
  reservation: CreateReservation[];
  submitted = false;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      Title: ['', Validators.required],
      Description: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.addForm.invalid) {
      return;
    }

    this.reservationService.create(this.addForm.value)
      .subscribe( data => {
        this.router.navigate(['list-reservation']);
      });
  }

  get fields() { return this.addForm.controls; }
}
