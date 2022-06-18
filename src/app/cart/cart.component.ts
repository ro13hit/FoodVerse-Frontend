import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import CustomStore from 'devextreme/data/custom_store';
import notify from 'devextreme/ui/notify';
import { lastValueFrom } from 'rxjs';
import { CartService } from '../services/cart.service';
import { ItemService } from '../services/item.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: any
  userId: number
  itemInfo: any
  address: any
  newAddress: any
  billValue = 0
  inputField : boolean = false
  shipping = 40
  constructor(
    private cartService: CartService,
    private userService: UserService,
    private itemService: ItemService,
    private router : Router,
    private sanitizer : DomSanitizer
  ) {
    this.userId = 0
    this.getUserId()
   }

  ngOnInit(): void {
    this.getCart()
  }

  async getCart() {
    var itemData : any = this.cartService.getCart(this.userId)
    itemData = await lastValueFrom(itemData)
    if(itemData.length>0)
    {
      this.billValue=0
      for(let item of itemData)
      {
        var itemInfo = await this.getItemData(item.itemId)
        Object.assign(item, {"ItemInfo": itemInfo})
        itemInfo.price = itemInfo.price * item.itemCount
        this.billValue += itemInfo.price
      }
      this.items = itemData
    }
    else
    {
      this.items = null
    }
  }

  async getUserId() {
    var data : any = this.userService.getUser()
    data = await lastValueFrom(data)
    this.userId = data.value.userId
    this.address = data.value.address
  }

  async getItemData(ItemId: number) {
    var data : any = this.itemService.getItemById(ItemId)
    data = await lastValueFrom(data)
    return data.value
  }

  displayImage(data : any){
    var base64Image = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,'+data.value);
    return base64Image
   }

  updateCart(e: any) {
    //console.log(e.data)
    var update = e.data
    this.cartService.updateCart(update.itemId, update.itemCount, this.userId).subscribe({next:(data)=>{
      //console.log(data)
      this.getCart()
    },error: (error)=>{
      console.log(error)
    }})
   }
   
  deleteFromCart(e: any) {
    this.cartService.deleteFromCart(e.data.itemId, this.userId).subscribe({next: (data)=>{
      this.billValue -= e.data.ItemInfo.price
      this.getCart()
    },error: (error)=>{
      console.log(error)
    }})
  }

  showField() {
    this.inputField = this.inputField ? false : true
  }

  placeOrder() {
    const data = {
      Address: this.address,
      UserId: this.userId,
      TotalBill: this.billValue + this.shipping
    }
    this.cartService.placeOrder(data).subscribe({next: (data)=>{
      console.log(data)
      notify(
        {
          message: "Order Placed Successfully",
          type: "success",
          displayTime: 2000,
          height: 100,
          width: 250,
          position: 'top right'
        }
      )
      this.router.navigate(['/home'])
    },error: (error)=>{
      console.log(error)
    }})
  }
}
