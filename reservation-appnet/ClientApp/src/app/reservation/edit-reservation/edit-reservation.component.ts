import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { ReservationService } from "../../services/reservation.service";
import {UploadAdapterService} from "../../services/upload.adapter.service";
import {ChangeEvent} from "@ckeditor/ckeditor5-angular";

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.css']
})
export class EditReservationComponent implements OnInit {
  reservationId: number;
  editForm: FormGroup;
  public Editor = ClassicEditor;
  dataEditor: any;
  submitted = false;

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
    this.submitted = true;

    if (this.editForm.invalid || !this.dataEditor) {
      return;
    }

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

  onReady(eventData) {
    eventData.plugins.get('FileRepository').createUploadAdapter = function (loader) {
      return new UploadAdapterService(loader);
    };
  }

  onChangeEditor( { editor }: ChangeEvent ) {
    if(editor) {
      const data = editor.getData();
      this.dataEditor = data;
    }
  }

}
