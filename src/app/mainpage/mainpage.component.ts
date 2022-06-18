import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { ItemService } from '../services/item.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../services/user.service';
import { CartService } from '../services/cart.service';
import { lastValueFrom } from 'rxjs';
import notify from 'devextreme/ui/notify';


@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {
  totalItems = 0
  cards : any
  buttonIcon : any
  constructor(
    private categoryService: CategoryService, 
    private sanitizer : DomSanitizer,
    private userService: UserService,
    private cartService: CartService) {
    this.buttonIcon = "chevronup"
   }

  ngOnInit(): void {
    this.categoryService.getCategoryWithItems().subscribe({next: (data: any)=>{
      data.value.forEach((element: any) => {
        Object.assign(element, {"isExpanded": true})
      });
      this.cards = data.value
    },error: (error)=>{
      console.log(error)
    }})
  }

  displayImage(data : any){
    
    var base64Image = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,'+data);
    return base64Image
 }

 toggleCard(data: any){
   data.isExpanded = data.isExpanded ? false : true
 }

  async createCart(ItemId: number, ItemCount: any) {
   var data : any = this.userService.getUser()
   data = await lastValueFrom(data)
   var UserId = data.value.userId
   var count : number = + ItemCount
   this.totalItems += count
   this.cartService.addToCart(ItemId,ItemCount,UserId).subscribe({next: (data: any)=>{
     //console.log(data)
     notify(
      {
        message: "Item Added To Cart!",
        type: "success",
        displayTime: 1000,
        height: 100,
        width: 250,
        position: 'top right'
      }
      
    )
   },error: (error)=>{
     console.log(error)
   }})
 }
}
