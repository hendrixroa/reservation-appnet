import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import { ReservationService } from "../../services/reservation.service";

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.css']
})
export class EditReservationComponent implements OnInit {
  reservationId: number;
  editForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private reservationService: ReservationService,
  ) { }

  ngOnInit() {
    this.reservationId = Number(this.route.snapshot.paramMap.get('id'));
    this.editForm = this.formBuilder.group({
      Title: ['', Validators.required],
      Description: ['', Validators.required],
    });
    this.reservationService.detail(this.reservationId)
      .subscribe(data => {
        this.editForm.setValue({
          Title: data.Title,
          Description: data.Description,
        });
      });
  }

  onSubmit() {

    this.reservationService.update(this.reservationId, this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['list-reservation']);
        },
        error => {
          alert(error);
        });
  }

}
