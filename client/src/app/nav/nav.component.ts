import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_service/account.service';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{  //'implements' is inheritance
  model: any = {};  


  constructor(public accountService: AccountService) {}
  
  ngOnInit(): void {
  }

  //methods to call from htmls
  login() {
    this.accountService.login(this.model).subscribe({
      next: Response => {
        console.log(Response);          
      },
      error: error => console.log(error)                    //any no '200s' response codes
    })
  }
  logout() {
    this.accountService.logout();
  }
} 