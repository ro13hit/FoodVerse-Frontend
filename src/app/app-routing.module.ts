import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CategoryComponent } from './category/category.component';
import { ItemComponent } from './item/item.component';
import { LoginComponent } from './login/login.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: "users/login", component: LoginComponent },
  { path: "users/signup", component: SignupComponent },
  { path: "categories/all", component: CategoryComponent},
  { path: "items/all", component : ItemComponent},
  { path: "home", component : MainpageComponent},
  { path: "cart", component : CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
