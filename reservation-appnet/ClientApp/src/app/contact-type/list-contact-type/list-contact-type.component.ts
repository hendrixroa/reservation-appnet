import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ContactType} from "../../models/contact.type.model";
import {ContactTypeService } from "../../services/contact.type.service";

@Component({
  selector: 'app-list-contact-type',
  templateUrl: './list-contact-type.component.html',
  styleUrls: ['./list-contact-type.component.css']
})
export class ListContactTypeComponent implements OnInit {

  contactTypes: ContactType[];

  constructor(private router: Router, private contactTypeService: ContactTypeService) { }

  ngOnInit() {
    this.list();
  }

  list() {
    this.contactTypeService.list()
      .subscribe(data => {
        this.contactTypes = data;
      });
  }

  add() {
    this.router.navigate(['add-contact-type']);
  }

  edit(id: number) {
    this.router.navigate([`edit-contact-type/${id}`]);
  }

  delete(id: number) {
    this.contactTypeService.delete(id)
      .subscribe(() => {
        this.list(); 
      });
  }
}
