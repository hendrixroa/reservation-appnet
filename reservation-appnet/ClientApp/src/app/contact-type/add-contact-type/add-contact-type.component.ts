import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { ContactTypeService } from "../../services/contact.type.service";

@Component({
  selector: 'app-add-contact-type',
  templateUrl: './add-contact-type.component.html',
  styleUrls: ['./add-contact-type.component.css']
})
export class AddContactTypeComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private contactTypeService: ContactTypeService) { }

  addForm: FormGroup;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      Description: ['', Validators.required],
    });

  }

  onSubmit() {
    this.contactTypeService.create(this.addForm.value)
      .subscribe( data => {
        this.router.navigate(['list-contact-type']);
      });
  }

}
