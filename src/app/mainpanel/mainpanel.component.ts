import { Component, OnInit } from '@angular/core';
import { FetchAllDataService } from './fetchAllData.service';

@Component({
  selector: 'app-mainpanel',
  templateUrl: './mainpanel.component.html',
  styleUrls: ['./mainpanel.component.css']
})
export class MainpanelComponent implements OnInit {

  constructor(private fetchAllDataService:FetchAllDataService) { }

  allData;
  private basePath = '/addVideo';

  ngOnInit() {
      this.allData = this.fetchAllDataService.getAllData(this.basePath);
  }
}
