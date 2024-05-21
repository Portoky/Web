import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router, RouterModule, RouterOutlet} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {GenericService} from "./generic.service";
import {NgForOf} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [HttpClientModule,
    FormsModule,
    RouterOutlet,
    NgForOf,
  RouterModule]
})
export class AppComponent implements OnInit {
    tableHtml: string = "";
    nameFilter: string = "";
    selectedRole: string = "";
    title = 'MyUser Management Application';
    roles: string[] = ["Manager", "Employee", "Boss", "CEO"];

    constructor(private genericService: GenericService, private router: Router) {
    }

  ngOnInit() {
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
