import { Component, OnInit , Inject} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import { ContactType } from "../../model/contact.type.model";
import { ContactTypeService } from "../../services/contact.type.service";

@Component({
  selector: 'app-contact-type',
  templateUrl: './edit-contact-type.component.html',
  styleUrls: ['./edit-contact-type.component.css']
})
export class EditContactTypeComponent implements OnInit {

  contactType: ContactType;
  editForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private contactTypeService: ContactTypeService,
    ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.editForm = this.formBuilder.group({
      Description: ['', Validators.required],
    });
    this.contactTypeService.detail(id)
      .subscribe(data => {
        this.editForm.setValue({ Description: data.Description });
      });
  }

  onSubmit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.contactTypeService.update(id, this.editForm.value)
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
