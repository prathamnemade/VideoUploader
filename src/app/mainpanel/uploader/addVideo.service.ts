import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class AddVideoService {

    private basePath = '/addVideo';
    constructor(private db: AngularFireDatabase) { }

    addVideo(data) {
        const obj = this.db.database.ref(this.basePath);
        obj.push(data);
        console.log('Success');
    }
}