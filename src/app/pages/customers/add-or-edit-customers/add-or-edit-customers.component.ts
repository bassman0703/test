import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzModalFooterDirective, NzModalRef} from "ng-zorro-antd/modal";
import {User} from "../../../models";
import {finalize} from "rxjs";
import {UserService} from "../../../services";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzFormDirective} from "ng-zorro-antd/form";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzDividerComponent} from "ng-zorro-antd/divider";

@Component({
  selector: 'app-add-or-edit-customers',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzRowDirective,
    NzInputDirective,
    NzFormDirective,
    NzColDirective,
    NzButtonComponent,
    NzModalFooterDirective,
    NzDividerComponent
  ],
  templateUrl: './add-or-edit-customers.component.html',
  styleUrl: './add-or-edit-customers.component.scss'
})
export class AddOrEditCustomersComponent implements OnInit{
  @Input() user!: User
  form: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    public modal: NzModalRef,
    private customersService: UserService
  ) {
    this.form = this.fb.group({
      clientNumber: ["", Validators.required],
      firsName: ["", Validators.required],
      lastName: ["", Validators.required],
      gender: [""],
      personalNumber: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      legalCountry: ["", Validators.required],
      legalCity: ["", Validators.required],
      legalAddress: ["", Validators.required],
      actualCountry: ["", Validators.required],
      actualCity: ["", Validators.required],
      actualAddress: ["", Validators.required],
    })
  }

  ngOnInit(): void {
    this.form.patchValue({
      ...this.user
    })
  }

  submit(): void {
    this.isLoading = true;
    if (this.user) {
      this.customersService
        .update(this.user.id, this.form.value)
        .pipe(finalize(() => {
          this.isLoading = false;
        })).subscribe(() => this.modal.triggerOk());
    } else {
      console.log(this.form.value)
      this.customersService
        .create(this.form.value)
        .pipe(finalize(() => {
          this.isLoading = false;
        }))
        .subscribe(() => this.modal.triggerOk());
    }
  }
}