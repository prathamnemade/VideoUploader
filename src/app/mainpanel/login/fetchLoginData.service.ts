import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Injectable()
export class FetchLoginDataService {
    constructor(private db: AngularFireDatabase) { }
    
    getAllData(path): Observable<any[]> {
        return this.db.list(path).valueChanges();
    }
}