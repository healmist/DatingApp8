import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './_service/account.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'Dating App';
  users: any;                                     //type of everything
  constructor(private http: HttpClient, private accountService: AccountService) {}        //also run 1st when the comp is instaciated
  
  ngOnInit(): void {                      //now includes two methods
    this.getUsers();
    this.setCurrentUser();
    };                                            //implement on 'AppComponent'
  
  getUsers() {
    this.http.get("https://localhost:5292/api/users").subscribe({
        next: Response => this.users = Response,
        error:  error =>  console.log(error),                   //two cases
        complete: ()  =>  console.log("Request has completed")
    });
  }
  
  setCurrentUser()  {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }
  
}

  

