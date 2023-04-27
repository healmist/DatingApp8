import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  registerMode = false;
  users: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUsers(); 
  }

  registerToggle() {
    this.registerMode = !this.registerMode
  }

  getUsers() {
    this.http.get("https://localhost:5292/api/users").subscribe({     //the usernames are in 'user.userName'
        next: response => this.users = response,
        error:  error =>  console.log(error),                         //two cases from api
        complete: ()  =>  console.log("Request has completed")
    });
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;            //from the event emitter in app-register
  }
}
