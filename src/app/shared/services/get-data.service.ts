import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  constructor(private _Firestore: Firestore) {}
  dateCollection = collection(this._Firestore, 'data');
  linksCollection = collection(this._Firestore, 'links');
  projectsCollection = collection(this._Firestore, 'projects');

  getData(): Observable<any> {
    return collectionData(this.dateCollection, {
      idField: 'id',
    }) as Observable<any>;
  }

  getLinks(): Observable<any> {
    return collectionData(this.linksCollection, {
      idField: 'id',
    }) as Observable<any>;
  }
  getProject(): Observable<any> {
    return collectionData(this.projectsCollection, {
      idField: 'id',
    }) as Observable<any>;
  }
}
