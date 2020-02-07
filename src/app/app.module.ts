import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { UserListComponent } from "./components/user-list.component";
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule
} from "@angular/material";
import { NewUserFormComponent } from "./components/new-user-form/new-user-form.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  declarations: [AppComponent, UserListComponent, NewUserFormComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
