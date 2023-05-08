import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_service/account.service';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{  //'implements' is inheritance
  model: any = {
  };


  constructor(public accountService: AccountService, private router: Router,
    private toastr: ToastrService) {}
  
  ngOnInit(): void {
  }

  //methods to call from htmls
  login() {
    this.accountService.login(this.model).subscribe({
      next: Response => {
        this.model = {};
      },                                                                //our the default route affer logins
      error: error => this.toastr.error(error.error)                   //any no '200s' response codes, object.object in DOM
    })
  }
  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/')
  }
}