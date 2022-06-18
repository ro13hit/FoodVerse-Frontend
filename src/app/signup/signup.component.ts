import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import notify from 'devextreme/ui/notify';
import { lastValueFrom } from 'rxjs';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers:[]
})
export class SignupComponent implements OnInit {
  passwordPattern : any = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/
  phonePattern : any = /^\d{10}$/
  loading = false;
  formData: any = {};
  constructor(private userService : UserService, private router: Router) {
    this.checkUnique = this.checkUnique.bind(this);
   }

  ngOnInit(): void {
    const check = this.userService.isLoggedIn()
    if(check)
    {
      this.router.navigate(["/home"])
    }
  }

  onSubmit()
  {
    const {firstName, lastName, email, password, phone, address} = this.formData;
    this.loading = true
    this.userService.signUp(firstName,lastName,email,password,phone,address).subscribe({next:(data: any)=>{
      if(data.message == "Signup Successfull!")
      {
        localStorage.setItem("email", email);
        notify(
          {
            message: "SignUp Success!",
            type : "success",
            displayTime: 1000,
            height: 100 ,
            width: 250,
            position: 'top right'
          }
        )
        this.router.navigate(["/users/login"])
      }
    }, error:(error)=>{
      this.loading = false;
      notify(
        {
          message: "Please Enter Correct Data For Signing Up!",
          type: "error",
          displayTime: 1000,
          height: 100,
          width: 250,
          position: 'top right'
        }
      )
    }});
  }

  async checkUnique(value: any)
  {
    var check = false
    const match : string = value.value;
    var data : any = this.userService.CheckEmailPhone(match)
    data  = await lastValueFrom(data);
    if(data.check.includes("unique")){
      check = true;
    }
    else{
      check = false;
    }
    return check;
  }
}
