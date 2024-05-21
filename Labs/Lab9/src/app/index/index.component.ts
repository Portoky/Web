import {ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {GenericService} from "../generic.service";
import {Router, RouterModule, RouterOutlet} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {AfterViewInit} from "@angular/core";

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [HttpClientModule,
    FormsModule,
    RouterOutlet,
    NgForOf,
    RouterModule,
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements AfterViewInit, OnInit{
  tableHtml: string = "";
  nameFilter: string = "";
  selectedRole: string = "";
  title = 'MyUser Management Application';
  roles: string[] = ["Manager", "Employee", "Boss", "CEO"];
  prevSearch: string = "";
  prevFilter: string = "";
  constructor(private genericService: GenericService, private router: Router, private elementRef: ElementRef, private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    console.log("AppComponent init");
    this.getUsersFromPhpBackend();
  }

  ngAfterViewInit() {
    console.log("AppComponent afterview");
  }
  addListenerToRows(){
    const tableContainer = this.elementRef.nativeElement.querySelector('#userTableContainer table');
    const rows = tableContainer.querySelectorAll("tr");
    for(let i = 1; i < rows.length; ++i){
      let id = rows[i].querySelector("td"); //get the datacell
      id = id.textContent; //got the id of the entity
      console.log(id);
      rows[i].addEventListener("click",()=> {
        for (let j = 1; j < rows.length; ++j) {
          rows[j].style.backgroundColor = "white";
        }
          rows[i].style.backgroundColor = "grey";
          this.addListenerToButtons(id);
      });
    }
  }
  addListenerToButtons(entityId: string): void {
    this.genericService.setSelectedId(entityId); //!!!

    const updateButton = this.elementRef.nativeElement.querySelector("#updateButton");
    updateButton.addEventListener("click", () => {
      console.log(entityId);
      this.router.navigate(["update"]);
    });

    const removeButton = this.elementRef.nativeElement.querySelector("#removeButton");
    removeButton.addEventListener("click", () => {
        this.genericService.deleteUser(entityId).subscribe({
          next : ()=>{console.log("cool"); this.getUsersFromPhpBackend()}
        })

    });
  }
  getUsersFromPhpBackend(){
    this.genericService.fetchUsers(this.selectedRole, this.nameFilter).subscribe(html=>{
      const userTableContainer = this.elementRef.nativeElement.querySelector("#userTableContainer");
      userTableContainer.innerHTML = html;
      this.addListenerToRows();
    })
  }
  filterChanged(){
    this.prevSearch = this.prevFilter;
    this.prevFilter = this.nameFilter;
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
