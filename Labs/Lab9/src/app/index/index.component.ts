import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {GenericService} from "../generic.service";
import {Router, RouterModule, RouterOutlet} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [HttpClientModule,
    FormsModule,
    RouterOutlet,
    NgForOf,
    RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  tableHtml: string = "";
  nameFilter: string = "";
  selectedRole: string = "";
  title = 'MyUser Management Application';
  roles: string[] = ["Manager", "Employee", "Boss", "CEO"];

  constructor(private genericService: GenericService, private router: Router) {
  }

  ngOnInit() {
    console.log("AppComponent init");
    this.getUsersFromPhpBackend();
  }

  getUsersFromPhpBackend(){
    this.genericService.fetchUsers(this.selectedRole, this.nameFilter).subscribe(html=>{
      this.tableHtml = html;
    })
  }
  filterChanged(){
    console.log(this.nameFilter);
    this.getUsersFromPhpBackend();
  }

  roleSelectionChanged(){
    console.log(this.selectedRole);
    this.getUsersFromPhpBackend();
  }

  navAddUser() {
    this.router.navigate(["/add"]);
  }
}
