import { Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import { Contact } from "../../models/contact.model";
import { ContactService } from "../../services/contact.service";

@Component({
  selector: 'app-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  contact: Contact;
  editForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private contactService: ContactService,
    ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.editForm = this.formBuilder.group({
      Description: ['', Validators.required],
    });
    this.contactService.detail(id)
      .subscribe(data => {
        this.editForm.setValue({ Description: data.Description });
      });
  }

  onSubmit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.contactService.update(id, this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['list-contact-type']);
        },
        error => {
          alert(error);
        });
  }

}
