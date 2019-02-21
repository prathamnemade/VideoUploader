import { Injectable } from '@angular/core';
import { videoUploader } from '../../models/videoUploader';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database, Data list and Single object
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AddVideoService } from './addVideo.service';
import { combineLatest } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

export class UploaderService {
  showUpload:boolean=false;
  uploads: any[];
  medaData: any = []
  allPercentage: Observable<any>;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  loader = false;
  profileUrl: Observable<string | null>;
  selectCategory: string = "";
  videoDescription: string = "";
  videoURL: any = [];
  toggleSubmit: boolean = false;
  id: any = [];
  currentSessionAddedVideos: any = []
  currentSessionAddedVideosURL: any = []
  uploadedBy=""
  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private router:Router,private db: AngularFireDatabase, private afStorage: AngularFireStorage, private addVideoService: AddVideoService) { 
    this.uploadedBy=sessionStorage.getItem('userName')+"|"+sessionStorage.getItem('userEmail')
  }
  upload(event) {
    this.showUpload=true;
    this.videoURL = []
    this.id = []
    this.uploads = [];
    const filelist = event.target.files;
    const allPercentage: Observable<number>[] = [];
    for (const file of filelist) {
      var id = Math.random().toString(36).substring(2);
      this.id.push(id);
      this.currentSessionAddedVideos.push(this.id)
      const ref = this.afStorage.ref(id);
      this.task = ref.put(file)
      const _percentage$ = this.task.percentageChanges();
      allPercentage.push(_percentage$);
      // create composed object with different information. ADAPT THIS ACCORDING YOUR NEED
      const uploadTrack = {
        fileName: file.name,
        percentage: _percentage$
      }
      // push each upload into the array
      this.uploads.push(uploadTrack);
      // for every upload do whatever you want in firestore with the uploaded file
      const _t = this.task.then((f) => {
        return f.ref.getDownloadURL().then((url) => {
          this.videoURL.push(url)
          console.warn("videourl",this.videoURL);
          this.medaData.push(f.metadata.name)
        })
      })

    }

    this.allPercentage = combineLatest(allPercentage)
      .pipe(
        map((percentages) => {
          let result = 0;
          for (const percentage of percentages) {
            result = result + percentage;
          }
          if(Math.round(result / percentages.length)==100){this.showUpload=false;}
          return Math.round(result / percentages.length);
        })
      );
  }




  submit() {
    for (let i = 0; i < this.id.length; i++) {
      this.addVideoService.addVideo({
        uploadedBy: sessionStorage.getItem('userEmail'),
        videoMetadata: this.medaData[i],
        videoURL: this.videoURL[i],
        description: this.videoDescription,
        categoryType: this.selectCategory,
        videoId: this.id[i]
      })

    }

    this.addVideoService.getAllData().subscribe(x => {
      for (let i = 0; i < x.length; i++) {
        for (let j = 0; j < this.currentSessionAddedVideos.length; j++) {
          if (x[i].videoId == this.currentSessionAddedVideos[j]) {
            this.currentSessionAddedVideosURL.push(x[i].videoURL)
          }
        }
      }
    })
    this.router.navigate(['/dashboard']);


  }


}