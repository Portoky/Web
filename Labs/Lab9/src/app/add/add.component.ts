import { Component } from '@angular/core';
import {GenericService} from "../generic.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {Router, RouterModule, RouterOutlet} from "@angular/router";
import {NgFor, NgForOf} from "@angular/common";

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [HttpClientModule,
    FormsModule,
    RouterOutlet,
    NgForOf,
    RouterModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
  name : string = "";
  username : string = "";
  password : string = "";
  roleSelected : string = "";
  email : string = "";
  age : string = "";
  webpage : string = "";
  roles: string[] = ["Manager", "Employee", "Boss", "CEO"];
  constructor(private genericService: GenericService, private router: Router) {
  }
  onAddClick() {
    this.genericService.addUser(this.name, this.username, this.password, this.roleSelected, this.email, this.age, this.webpage)
      .subscribe((html) => {
        // Handle success, maybe show a message
        console.log(html);
        // Then navigate
        this.router.navigate([""]);
      }, error => {
        // Handle error
        console.error("Error adding user:", error);
      });
  }
}
