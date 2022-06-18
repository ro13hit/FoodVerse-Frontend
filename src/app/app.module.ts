import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxFormModule, DxValidatorModule, DxFileUploaderModule, DxLoadIndicatorModule, DxResponsiveBoxModule, DxDrawerModule, DxDrawerComponent, DxListModule, DxRadioGroupModule, DxToolbarModule} from 'devextreme-angular';
import { CategoryComponent } from './category/category.component';
import { UserService } from './services/user.service';
import { ItemComponent } from './item/item.component';
import { HeaderComponent } from './header/header.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { CartComponent } from './cart/cart.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    CategoryComponent,
    ItemComponent,
    HeaderComponent,
    MainpageComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DxButtonModule,
    DxDataGridModule,
    DxFormModule,
    DxLoadIndicatorModule,
    DxResponsiveBoxModule,
    DxValidatorModule,
    DxDrawerModule,
    DxListModule,
    DxRadioGroupModule,
    DxToolbarModule,
    DxFileUploaderModule
  ],
  providers: [ UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
