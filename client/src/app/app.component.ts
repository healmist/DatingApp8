import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'Dating App';
  users: any;                                     //type of everything
  constructor(private http: HttpClient) {}        //also run 1st when the comp is instaciated
  
  ngOnInit(): void {
    this.http.get("http://localhost:5292/api/users").subscribe({
        next: Response => this.users = Response,
        error:  error =>  console.log(error),                   //two cases
        complete: ()  =>  console.log("Request has completed"),
  
        });
    };                                            //implement on 'AppComponent'
  }

  

