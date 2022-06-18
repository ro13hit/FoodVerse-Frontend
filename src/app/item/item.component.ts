import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import CustomStore from 'devextreme/data/custom_store';
import { lastValueFrom } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class ItemComponent implements OnInit {
  items : any
  isUploaded : boolean = false
  categories: any
  baseUrl : string = "https://localhost:7192/api/Item"
  ImageBaseData: any;

  constructor(private itemService: ItemService, private categoryService: CategoryService,private sanitizer: DomSanitizer) { 
    this.getCategories()
    this.items = new CustomStore({
      key: 'itemId',
      load: () => this.itemService.sendRequest(`${this.baseUrl}/GetItems`),
      insert: (values) => this.itemService.sendRequest(`${this.baseUrl}/AddItem`, 'POST', {
        values: JSON.stringify(values),
      }),
      update: (key, values) => this.itemService.sendRequest(`${this.baseUrl}/UpdateItemByProperty`, 'PATCH', {
        key,
        values: JSON.stringify(values),
      }),
      remove: (key) => this.itemService.sendRequest(`${this.baseUrl}/DeleteItem`, 'DELETE', {
        key,
      })
    });
  }

  ngOnInit(): void {
  }

  async getCategories(){
    var categoryData : any = this.categoryService.getCategoryWithItems()
    categoryData = await lastValueFrom(categoryData)
    this.categories = categoryData.value
  }

  onEditorPreparing(e: any) {
    if (e.parentType === 'dataRow' && e.dataField === 'Category') {
      e.editorOptions.disabled = (typeof e.row.data.categoryId !== 'number');
    }
    this.isUploaded = false
  }

  setStateValue(rowData: any, value: any): void {
    rowData.categoryId = null;
    (<any> this).defaultSetCellValue(rowData, value);
  }

  handleFileInput(files: FileList, cellInfo: any) {
    let file = files[0];
    let me = this
    let reader: any = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      me.ImageBaseData = reader.result;
      var base64Index = reader.result.indexOf(';base64,') + ';base64,'.length;
      var base64 = reader.result.substring(base64Index);
      var raw = window.atob(base64);
      var rawLength = raw.length;
      var byteArray = new Uint8Array(rawLength);
      let i;
      for(i = 0; i < rawLength; i++) {
        byteArray[i] = raw.charCodeAt(i);
      }
      cellInfo.setValue([byteArray]);
    };
    this.isUploaded = true
    reader.onerror = function (error:any) {
      console.log('Error: ', error);
      this.isUploaded = false
    };
 }

  displayImage(data : any){
   var base64Image = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,'+data.data.image);
   return base64Image
  }

  openPopUp(data: any) {
    var base64Image = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,'+data.data.image);
    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=1000,height=600,left=100,top=100`;
    let displayImage = new Image();
    displayImage.src = Object.values(base64Image)[0]
    displayImage.height = 580
    displayImage.width = 980
    var w = window.open("","Image",params);
    w?.document.write(displayImage.outerHTML)
  }
}
