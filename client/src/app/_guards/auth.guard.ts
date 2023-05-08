import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountService } from '../_service/account.service';
import { ToastrService } from 'ngx-toastr'
 
 
export const AuthGuard = () => {
    const accountService = inject(AccountService);
    const toastr = inject(ToastrService);
 
    return accountService.currentUser$.pipe(
        map((user) => {
            if (user) return true;
            else {
                toastr.error("Access Denied!");
                return false;
            }
        })
    )
};

/*

FOR ANGULAR <14.X.X

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService, private toastr: ToastrService) {}

  canActivate(): Observable<Boolean> {
    return this.accountService.currentUser$.pipe(
      map((user) => {
        if (user) return true;
        else {
          this.toastr.error('Access denied!');
          return false
          }}))} }
*/