import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import notify from 'devextreme/ui/notify';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  passwordPattern : any = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/
  loading = false;
  formData: any = {};
  passwordMode : string;
  passwordButton : any
  constructor(private userService: UserService, private router: Router) { 
    this.passwordMode = 'password'
    this.passwordButton = {
      icon: "https://cdn-icons-png.flaticon.com/128/159/159604.png",
      onClick : () => {
        this.passwordMode = this.passwordMode === 'text' ? 'password' : 'text'
      }
    }
  }

  ngOnInit(): void {
    const check = this.userService.isLoggedIn()
    if(check)
    {
      this.router.navigate(["/home"])
    }
  }

  onSubmit(){
    const { email, password } = this.formData;
    this.loading = true;
    this.userService.login(email,password).subscribe({next:(data: any)=>{
      if(data.message == "Login Successfull!")
      {
        localStorage.setItem("token", data.token.value.token);
        localStorage.setItem("email", email);
        notify(
          {
            message: "Login Success!",
            type : "success",
            displayTime: 1000,
            height: 100,
            width: 250,
            position: 'top right'
          }
        )
        this.router.navigate(["/home"])
      }
    }, error:(error)=>{
      this.loading = false
      notify(
        {
          message: "Please check your email and password!",
          type: "error",
          displayTime: 1000,
          height: 100,
          width: 250,
          position: 'top right'
        }
      )
    }});
  }

  onCreateAccountClick = () => {
    this.router.navigate(['/users/signup']);
  }

}
