import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import notify from 'devextreme/ui/notify';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isDrawerOpen = true;
  constructor(
    private userService : UserService, 
    private router: Router ) {
   }

  ngOnInit(): void {
    if(this.isSignedIn())
    {
      this.router.navigate(["/home"])
    }
    else
    {
      this.router.navigate(["/users/login"])
    }
  }

  navigation: any[] = [
    { id: 1, text: "Home", icon: 'home', path: "home" },
    { id: 2, text: "Categories List", icon: "hierarchy", path: "categories/all" },
    { id: 3, text: "Items List", icon: "coffee", path: "items/all"}
  ];
 
    buttonOptions: any = {
        icon: "hidepanel",
        onClick: () => {
          this.isDrawerOpen = this.isDrawerOpen ? false : true
        }
    }

    isSignedIn()
    {
      const check = this.userService.isLoggedIn()
      if(check)
      {
        this.isDrawerOpen = this.isDrawerOpen ? false : true
      }
      return check;
    }
  
    logout()
    {
      this.userService.SignOut()
      notify(
        {
          message: "Logged Out!",
          type: "warning",
          displayTime: 1000,
          height: 100,
          width: 250,
          position: 'top right'
        }
      )
      this.isDrawerOpen = false
      this.router.navigate(["/users/login"])
    }
    
    showCart()
    {
      this.router.navigate(["/cart"])
    }


}
