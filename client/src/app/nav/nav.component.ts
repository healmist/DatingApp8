import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_service/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{  //'implements' is inheritance
  model: any = {};  
  loggedIn = false; //default case

  constructor(private accountService: AccountService) {}
  
  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser()  {
    this.accountService.currrentUser$.subscribe({
      next: user => this.loggedIn = !!user,           //'!!' boolean-it-out of user
      error: error => console.log(error)
    })
  }

  //methods to call from htmls
  login() {
    this.accountService.login(this.model).subscribe({
      next: Response => {
        console.log(Response);
        this.loggedIn = true;
      },
      error: error => console.log(error)                    //any no '200s' response codes
    })
  }
  logout() {
    this.accountService.logout();
    this.loggedIn = false
  }
} 