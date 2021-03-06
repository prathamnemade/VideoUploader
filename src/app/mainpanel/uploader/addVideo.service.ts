import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Injectable()
export class AddVideoService {

    private basePath = '/addVideo';
    constructor(private db: AngularFireDatabase) { }

    addVideo(data) {
        const obj = this.db.database.ref(this.basePath);
        obj.push(data);
        console.log('Success');
    }
    getAllData(): Observable<any[]> {
        return this.db.list(this.basePath).valueChanges();
    }
}