import { Component, OnInit } from '@angular/core';
import { FetchAllDataService } from './fetchAllData.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-mainpanel',
  templateUrl: './mainpanel.component.html',
  styleUrls: ['./mainpanel.component.css']
})
export class MainpanelComponent implements OnInit {

  constructor(private fetchAllDataService: FetchAllDataService, public sanitizer: DomSanitizer) { }

  allData: any = [];
  private basePath = '/addVideo';
  data = [];
  uniqueCategory: any = []
  selectedCategory: any = [];
  ngOnInit() {
    this.fetchAllDataService.getAllData(this.basePath).subscribe(z => {
      this.allData = z;
      this.data = z;
      var flags = [];
      this.uniqueCategory = [{ code: "All", name: "All" }];
      for (var i = 0; i < this.data.length; i++) {
        if (flags[this.data[i].categoryType.name]) continue;
        flags[this.data[i].categoryType.name] = true;
        this.uniqueCategory.push({ code: this.data[i].categoryType.code, name: this.data[i].categoryType.name });
      }
    })
  }
  filterData() {
    var dummyData = []
    dummyData = this.allData;
    this.allData = []
    if (this.selectedCategory.name != "All") {
      for (let i = 0; i < dummyData.length; i++) {
        if (dummyData[i].categoryType.name == this.selectedCategory.name) {
          this.allData.push(dummyData[i])
        }
      }
    } else {
      this.fetchAllDataService.getAllData(this.basePath).subscribe(z => {
        this.allData = z;
      })
    }
  }
}
