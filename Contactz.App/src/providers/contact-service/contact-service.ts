// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';

// /*
//   Generated class for the ContactServiceProvider provider.

//   See https://angular.io/guide/dependency-injection for more info on providers
//   and Angular DI.
// */
// @Injectable()
// export class ContactServiceProvider {

//   constructor(public http: HttpClient) {
//     console.log('Hello ContactServiceProvider Provider');
//   }

// }
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Contact } from '../../models/contact'

@Injectable()
export class ContactService {
  githubApiUrl = 'https://api.github.com';
  apiURL = 'http://localhost:51763';

  constructor(public http: Http) { }

  //load all
  load(): Observable<Contact[]> {
    var res = this.http.get(`${this.apiURL}/contact/index`)
      .map(res => <Contact[]>res.json());
    return res;
  }
  //search
  searchContacts(searchParam: string): Observable<Contact[]> {
    var res = this.http.get(`${this.apiURL}/contact/search?filter=${searchParam}`)
      .map(res => <Contact[]>(res.json()));
    // console.log(res);
    return res;
  }
  //details
  loadDetails(Name: string): Observable<Contact> {
    var res = this.http.get(`${this.apiURL}/contact/get?name=${Name}`)
      .map(res => <Contact>(res.json()));
    // console.log(res);
    return res;
  }
  //create
  postContact(contact: Contact) {
    let bodyString = JSON.stringify(contact);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.post(this.apiURL + '/contact/post', contact, options)
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
      .subscribe();
  }
  //update
  putContact(contact: Contact) {
    let bodyString = JSON.stringify(contact);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.put(this.apiURL + '/contact/put', contact, options)
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
      .subscribe();
  }
}