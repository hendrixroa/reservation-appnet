import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { ContactService } from "../../services/contact.service";
import {ContactType} from "../../models/contact.type.model";
import {ContactTypeService} from "../../services/contact.type.service";

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private contactService: ContactService,
    private contactTypeService: ContactTypeService,
  ) { }

  addForm: FormGroup;
  contactTypes: string[];
  submitted = false;
  enableAddButton = true;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Birthdate: ['', Validators.required],
      Phone: [''],
      ContactType: ['', Validators.required],
    });
    this.list();
  }

  onSubmit() {
    this.submitted = true;

    if (this.addForm.invalid) {
      return;
    }

    const payload = {
      ...this.addForm.value,
      ContactType: { Description: this.contactType.value },
    };
    this.contactService.create(payload)
      .subscribe();
  }

  list() {
    this.contactTypeService.list()
      .subscribe(data => {
        this.contactTypes = data.map(type => type.Description);
      });
  }

  get contactType() {
    return this.addForm.get('ContactType');
  }

  get fields() { return this.addForm.controls; }

  changeContactType(e) {
    this.contactType.setValue(e.target.value);
  }

  changeName(e) {
    console.log('name: ', e.target.value);
    const name = e.target.value;
    if(name) {
      this.contactService.list({ Name: name })
        .subscribe(data => {
          if(data.length > 0) {
            this.addForm.setValue({
              Name: data[0].Name,
              Birthdate: data[0].Birthdate.split('T')[0],
              Phone: data[0].Phone,
              ContactType: data[0].ContactType,
            });
            this.enableAddButton = false;
          } else {
            this.enableAddButton = true;
          }
        });
    }
  }

}
