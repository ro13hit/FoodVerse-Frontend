import { Component, OnInit } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import {CategoryData, CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {
  baseUrl : string = "https://localhost:7192/api/Category"
  categories: any;
  constructor(private categoryService : CategoryService) { 
    
    this.categories = new CustomStore({
      key: 'categoryId',
      load: () => this.categoryService.sendRequest(`${this.baseUrl}/GetCategories`),
      insert: (values) => this.categoryService.sendRequest(`${this.baseUrl}/AddCategory`, 'POST', {
        values: JSON.stringify(values),
      }),
      update: (key, values) => this.categoryService.sendRequest(`${this.baseUrl}/UpdateCategoryByProperty`, 'PATCH', {
        key,
        values: JSON.stringify(values),
      }),
      remove: (key) => this.categoryService.sendRequest(`${this.baseUrl}/DeleteCategory`, 'DELETE', {
        key,
      })
    });
  }

  ngOnInit(): void {
  }

  selectionChanged(data: any)
  {
    console.log(data)
  }
}
