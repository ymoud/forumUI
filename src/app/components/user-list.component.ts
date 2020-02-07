import { Component, OnInit } from "@angular/core";
import { IUser } from "../classes/user";
import { UserService } from "../../app/services/user-service";

@Component({
  selector: "user-list",
  templateUrl: "./user-list.component.html"
})
export class UserListComponent implements OnInit {
  public users: IUser[];
  public userService: UserService;
  public addUser:boolean;
  constructor() {}
  ngOnInit(): void {
    this.userService = new UserService();
    this._initialize();
    this._getUserList();
  }

  public openNewForm(){
    this.addUser=true;

  }
  private _initialize() {
    this.userService.list$.subscribe(list => (this.users = list));
  }
  private _getUserList() {
    this.userService.getAll().subscribe();
  }
}
