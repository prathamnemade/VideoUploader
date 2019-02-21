import { Component, OnInit } from '@angular/core';
import { FetchAllDataService } from './fetchAllData.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
declare var $: any;
import { finalize } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
@Component({
  selector: 'app-mainpanel',
  templateUrl: './mainpanel.component.html',
  styleUrls: ['./mainpanel.component.css']
})
export class MainpanelComponent implements OnInit {
  uploadedBy: string = "";
  uploadedByEmail: string = "";
  triggerModal: boolean = false;
  constructor(private afStorage: AngularFireStorage, private af: AngularFireDatabase, private router: Router, private fetchAllDataService: FetchAllDataService, public sanitizer: DomSanitizer) {
    this.uploadedBy = sessionStorage.getItem('userName')
    this.uploadedByEmail = sessionStorage.getItem('userEmail')


  }
  dataToBeReplaced: any = []
  allData: any = [];
  private basePath = '/addVideo';
  data = [];
  uniqueCategory: any = []
  selectedCategory: any = [];
  clickedWatch: any;
  showUpload: boolean = false;
  edited: any = [{
    videoMetadata: "",
    videoURL: "",
    description: "",
    categoryType: "",
  }];
  categories = []
  triggeredit: boolean = false;
  ngOnInit() {
    this.categories = [
      { name: 'Category A', code: 'A' },
      { name: 'Category B', code: 'B' },
      { name: 'Category C', code: 'C' },
    ]
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
  editVideo(clicked) {
    this.triggerModal = false;
    this.dataToBeReplaced = clicked;
    this.edited.description = clicked.description;
    this.edited.videoURL = clicked.videoURL;
    this.edited.categoryType = clicked.categoryType;
    this.edited.videoMetadata = clicked.videoMetadata;

  }
  logout() {
    sessionStorage.setItem('userEmail', '')
    sessionStorage.setItem('userName', '')
    this.router.navigate(['/login']);
  }
  addVideos() {
    this.router.navigate(['/addVideo'])
  }
  watchVideo(item) {
    this.clickedWatch = item;
  }




  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  videoURL = "";
  id;
  metaData;
  upload(event) {
    //delete
    this.afStorage.storage.refFromURL(this.dataToBeReplaced.videoURL).delete();
    const id = Math.random().toString(36).substring(2);
    this.id = id
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.task.then((f) => { this.metaData = f.metadata.name })
    this.uploadProgress = this.task.percentageChanges()
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.ref.getDownloadURL(); this.downloadURL.subscribe(x => { this.videoURL = x; }
        );
      })
    )
      .subscribe()
  }
  updateVideo() {
    this.fetchAllDataService.getAllData(this.basePath).subscribe(z => {
      for (let i = 0; i < z.length; i++) {
        if (z[i].videoURL == this.dataToBeReplaced.videoURL) {
          this.af.object('/addVideo')
            .update({
              uploadedBy: sessionStorage.getItem('userEmail'),
              videoMetadata: this.metaData,
              videoURL: this.videoURL,
              description: this.edited.description,
              categoryType: this.edited.categoryType,
              videoId: this.id
            });

        }

      }
    })



  }
}

