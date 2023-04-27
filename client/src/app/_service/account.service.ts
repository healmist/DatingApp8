import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = 'https://localhost:5292/api/';
  
  //behavior subject (observable-like) type '<User>' iitiated as 'null'
  private currentUserSource = new BehaviorSubject<User | null>(null); // '|'(alt+124) is the 'or' logic operator for TS
  currentUser$ = this.currentUserSource.asObservable();              //'$' is conventionally noted for an observable object
  
  constructor(private http: HttpClient) { }

  login(model:any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(  //'.pipe(map(user))'
      map((Response: User) => {
        const user = Response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user)
        }
      })
    )
  }
  
  setCurrentUser(user: User)  {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(    //and adds the observer
      map(user =>{
        if (user) {
          localStorage.setItem('item', JSON.stringify(user));
          this.currentUserSource.next(user)
        }
      })
    )
  }
}
