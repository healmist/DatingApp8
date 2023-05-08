import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_service/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',                               //app-register is child of app-home since its called from its html
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  @Output() cancelRegister = new EventEmitter();

  model: any = {}

  constructor(private accountService: AccountService, private toastr: ToastrService) { }
  
  ngOnInit(): any {
  }

  register() {
    this.accountService.register(this.model).subscribe({
      next: () => {
        this.cancel()
      },
      error: error => this.toastr.error(error.error)              //'toastr' from constructor()
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
