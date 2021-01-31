import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ChangeEvent} from "@ckeditor/ckeditor5-angular";

import { CreateReservation } from "../../models/reservation.model";
import {ReservationService} from "../../services/reservation.service";

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css']
})
export class AddReservationComponent implements OnInit {
  public Editor = ClassicEditor;
  addForm: FormGroup;
  reservation: CreateReservation[];
  submitted = false;
  dataEditor: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private reservationService: ReservationService,
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      Title: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;

    console.log('data: ', this.addForm.invalid, this.dataEditor);
    if (this.addForm.invalid || !this.dataEditor) {
      return;
    }

    this.reservationService.create(1, {
        ...this.addForm.value,
        Description: this.dataEditor,
      })
      .subscribe( data => {
        this.router.navigate(['list-reservation']);
      });
  }

  get fields() { return this.addForm.controls; }

  onReady(eventData) {
    eventData.plugins.get('FileRepository').createUploadAdapter = function (loader) {
      return new UploadAdapter(loader);
    };
  }

  onChangeEditor( { editor }: ChangeEvent ) {
    if(editor) {
      const data = editor.getData();
      this.dataEditor = data;
    }
  }
}

class UploadAdapter {
  loader: any;

  constructor( loader ) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file
      .then( file => new Promise( ( resolve, reject ) => {
        let myReader= new FileReader();
        myReader.onloadend = (e) => {
          resolve({ default: myReader.result });
        }
        myReader.readAsDataURL(file);
      }));
  };
}
