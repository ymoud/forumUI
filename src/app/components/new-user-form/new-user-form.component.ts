import { Component, Input, OnInit } from "@angular/core";
import { IUser } from "src/app/classes/user";
import { UserService } from "src/app/services/user-service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "new-user-form",
  templateUrl: "./new-user-form.component.html"
})
export class NewUserFormComponent implements OnInit {
  @Input() userService: UserService;
  public formFields: FormGroup;
  public genders: string[];
  constructor() {}
  ngOnInit(): void {
    this.genders = ["Male", "Female", "Other"];
    this._initForm();
  }
  private _initForm() {
    this.formFields = new FormGroup({
      name: new FormControl(null, Validators.required),
      surname: new FormControl(null),
      age: new FormControl(null),
      id: new FormControl(null)
    });
  }

  public addNew() {
    this.userService.createUser(this.formFields.value);
  }
}
