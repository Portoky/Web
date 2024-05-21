import {Component, OnInit} from '@angular/core';
import {GenericService} from "../generic.service";
import {Router, RouterModule, RouterOutlet} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {RestrictedUser} from "../User";

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [HttpClientModule,
    FormsModule,
    RouterOutlet,
    NgForOf,
    RouterModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {
  name : string = "";
  username : string = "";
  password : string = "";
  roleSelected : string = "";
  email : string = "";
  age : number = 0;
  webpage : string = "";
  roles: string[] = ["Manager", "Employee", "Boss", "CEO"];


  constructor(private genericService: GenericService, private router: Router) {
  }

  ngOnInit() {
   this.genericService.getUserById()
     .subscribe({
       next: (user)=>{
         const restrictedUser = user as RestrictedUser;
         console.log(user);
         this.name = restrictedUser.name;
         this.username = restrictedUser.username;
         this.email = restrictedUser.email;
         this.roleSelected = restrictedUser.role;
         this.age = restrictedUser.age;
         this.webpage = restrictedUser.webpage;
         },
       error: (error) => {
         console.error('Error fetching user data:', error);
       }
     });
  }

  onUpdateClick(){
    if(this.name === "" || this.username === "" || this.password === "" || this.roleSelected ==="" || this.email=== "" ||
      this.age == 0 || this.webpage === "")
    {
      alert("There are empty fields!");
      return;
    }
    this.genericService.updateUser(this.name, this.username, this.password, this.roleSelected, this.email, this.age, this.webpage).subscribe({
      next: ()=>{
        console.log("success");
        this.router.navigate([""]);
      }
    })
  }
}
