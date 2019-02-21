import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class RegisterService {

    private basePath = '/register';
    constructor(private db: AngularFireDatabase) { }

    register(data) {
        const obj = this.db.database.ref(this.basePath);
        obj.push(data);
        console.log('Success');
    }
}