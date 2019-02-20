import { Injectable } from '@angular/core';
import { videoUploader } from '../../models/videoUploader';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database, Data list and Single object
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AddVideoService } from './addVideo.service';

@Injectable({
  providedIn: 'root'
})

export class UploaderService {
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  loader = false;
  profileUrl: Observable<string | null>;
  selectCategory: string = "";
  videoDescription: string = "";
  videoURL: string;
  toggleSubmit: boolean = false;
  id: string;
  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private db: AngularFireDatabase, private afStorage: AngularFireStorage, private addVideoService: AddVideoService) { }
  upload(event) {
    const id = Math.random().toString(36).substring(2);
    this.id = id;

    console.warn("id", id);

    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadProgress = this.task.percentageChanges()
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.ref.getDownloadURL(); this.downloadURL.subscribe(x => { this.videoURL = x; this.toggleSubmit = true; console.warn("ssssss", x); }
        );
      })
    )
      .subscribe()
    this.loader = true;
  }


  submit() {
    this.addVideoService.addVideo({
      uploadedBy: "ABC",
      videoMetadata: "mets",
      videoURL: this.videoURL,
      description: this.videoDescription,
      categoryType: this.selectCategory,
      thumbnailImage: "thumb",
      videoId: this.id
    })
  }

  // generateThumbnail(event) {
  //   console.warn("event",event);
    
  //   // console.warn(thumbnail);
    
  //   // var canvas = document.createElement('canvas');
  //   // canvas.width = 640;
  //   // canvas.height = 480;
  //   // var context = canvas.getContext('2d');
  //   // var img = new Image();
  //   // context.drawImage(img, 0, 0, canvas.width, canvas.height);
  //   // var dataURI = canvas.toDataURL('image/jpeg');
  //   // console.warn("daya", dataURI);
  //   var cmd = ffmpeg('/tmp/video.avi')
  //   .setFfmpegPath(ffmpeg_static.path)
  //   .videoBitrate(1024)
  //   .videoCodec('divx')
  //   .format('avi')
  //   .on('end', () => {
  //     // ...
  //   })
  //   .on('error', err => {
  //     console.error(err);
  //   })
  //   .save('/tmp/file-out.avi');
  // }

}