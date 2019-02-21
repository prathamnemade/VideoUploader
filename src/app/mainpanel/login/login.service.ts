import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class LoginService {

    private basePath = '/login';
    constructor(private db: AngularFireDatabase) { }

    login(data) {
        const obj = this.db.database.ref(this.basePath);
        obj.push(data);
        console.log('Success');
    }
}