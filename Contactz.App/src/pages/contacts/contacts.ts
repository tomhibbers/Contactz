import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Contact } from '../../models/contact';

import { ContactService } from '../../providers/contact-service/contact-service';

import { ContactDetailsPage } from '../contact-details/contact-details';

@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html'
})
export class ContactsPage {
  contacts: Contact[]
  originalUsers: Contact[];

  constructor(public navCtrl: NavController, private contactService: ContactService) {
    contactService.load().subscribe(contacts => {
      this.contacts = contacts;
      this.originalUsers = contacts;
    })
  }

  goToDetails(Name: string) {
    this.navCtrl.push(ContactDetailsPage, { Name });
  }

  search(searchEvent) {
    let term = searchEvent.target.value
    // only hit api if 3 or more characters
    if (term.trim() === '' || term.trim().length < 3) {
      // use cached
      this.contacts = this.originalUsers;
    } else {
      // search for contacts
      this.contactService.searchContacts(term)
        .subscribe(contacts => {
          this.contacts = contacts;
        });
    }
  }
}