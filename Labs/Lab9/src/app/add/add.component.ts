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
    if(this.name === "" || this.username === "" || this.password === "" || this.roleSelected ==="" || this.email=== "" ||
    this.age === "" || this.webpage === "")
    {
      alert("There are empty fields!");
      return;
    }
    //console.log(this.roleSelected)
    this.genericService.addUser(this.name, this.username, this.password, this.roleSelected, this.email, this.age, this.webpage)
      .subscribe({
        next: ()=>{console.log("success"); this.router.navigate([""])},
      });
  }
}
