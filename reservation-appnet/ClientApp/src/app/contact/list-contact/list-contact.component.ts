import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Contact} from "../../models/contact.model";
import {ContactService } from "../../services/contact.service";

@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.css']
})
export class ListContactComponent implements OnInit {

  contacts: Contact[];

  constructor(private router: Router, private contactService: ContactService) { }

  ngOnInit() {
    this.list();
  }

  list() {
    this.contactService.list()
      .subscribe(data => {
        this.contacts = data.Items;
      });
  }

  add() {
    this.router.navigate(['add-contact']);
  }

  edit(id: number) {
    this.router.navigate([`edit-contact/${id}`]);
  }

  delete(id: number) {
    this.contactService.delete(id)
      .subscribe(() => {
        this.list(); 
      });
  }
}
