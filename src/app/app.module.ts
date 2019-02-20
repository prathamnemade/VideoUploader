import { NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MainpanelComponent } from './mainpanel/mainpanel.component';
import { UploaderComponent } from './mainpanel/uploader/uploader.component';
import { environment } from '../environment';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { UploaderService } from './mainpanel/uploader/uploader.service';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { RoundPipe } from './mainpanel/uploader/round.pipe';
import { AddVideoService } from './mainpanel/uploader/addVideo.service';
import { FetchAllDataService } from './mainpanel/fetchAllData.service';
import { LoginComponent } from './mainpanel/login/login.component';
import { AppRoutingModule } from './app.routes';
@NgModule({
  declarations: [
    AppComponent,LoginComponent,
    MainpanelComponent,
    UploaderComponent,RoundPipe
  ],
  imports: [
    AppRoutingModule,AngularFireStorageModule,HttpClientModule,ProgressSpinnerModule,DropdownModule,InputTextareaModule,BrowserAnimationsModule,BrowserModule,FormsModule, AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // for database
  ],
  providers: [UploaderService,AddVideoService,FetchAllDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
