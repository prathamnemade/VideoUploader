import { Component, OnInit } from '@angular/core';
import { UploaderService } from './uploader.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {
  
  toggleSubmit:boolean=true;
  categories=[]
  constructor(public uploaderService:UploaderService) { 
    this.categories=[
      {name:'Category A',code:'A'},
      {name:'Category B',code:'B'},
      {name:'Category C',code:'C'},
    ]
  }

  ngOnInit() {
  }

}
