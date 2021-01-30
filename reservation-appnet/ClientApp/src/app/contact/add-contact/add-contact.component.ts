import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { ContactService } from "../../services/contact.service";
import {ContactType} from "../../model/contact.type.model";
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
  contactTypes: ContactType[];

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Birthdate: ['', Validators.required],
      Phone: [''],
      ContactType: ['', Validators.required],
    });
  }

  onSubmit() {
    this.contactService.create(this.addForm.value)
      .subscribe( data => {
        this.router.navigate(['list-contact']);
      });
  }

  list() {
    this.contactTypeService.list()
      .subscribe(data => {
        this.contactTypes = data;
      });
  }

  get contactType() {
    return this.addForm.get('contactType');
  }

  changeContactType(e) {
    this.contactType.setValue(e.target.value, {
      onlySelf: true
    })
  }

}
