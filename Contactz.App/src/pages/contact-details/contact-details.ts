import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Contact } from '../../models/contact';
import { ContactService } from '../../providers/contact-service/contact-service';
import { ContactsPage } from '../contacts/contacts';

@IonicPage()
@Component({
  selector: 'page-contact-details',
  templateUrl: 'contact-details.html',
})
export class ContactDetailsPage {
  title: string;
  contact: Contact;

  ID: number;
  Name: string;
  Surname: string;
  Email: string;
  Mobile: string;
  MobileInt: number;

  create: boolean = false;
  edit: boolean = false;

  constructor(public navCtrl: NavController, private navParams: NavParams, private contactService: ContactService) {
    this.Name = navParams.get('Name');
    if (this.Name == null) {
      //new
      this.create = true;
      this.edit = true;
      this.title = "Add Contact";
    }
    else {
      //details
      this.create = false;
      this.title = this.Name + "'s Details";
      contactService.loadDetails(this.Name).subscribe(contact => {
        this.contact = contact;
        this.ID=this.contact.ID;
        this.Name = this.contact.Name;
        this.Surname = this.contact.Surname;
        this.Email = this.contact.Email;
        this.Mobile=this.contact.Mobile;
        this.MobileInt=this.contact.MobileInt;
        // console.log(contact);
      });

      this.edit = false;
    }
  }
  onClicked(toggle) {
    if (this.create) {
      //create contact
      this.contact = {
        ID: this.ID,
        Name: this.Name,
        Surname: this.Surname,
        Email: this.Email,
        Mobile: this.Mobile,
        MobileInt: this.MobileInt,
      };
      this.contactService.postContact(this.contact);
      //back
      this.navCtrl.push(ContactsPage);
      this.navCtrl.setRoot(ContactsPage);
    }
    else if (this.edit == true) {
      //update contact
      this.contact.ID = this.ID;
      this.contact.Name = this.Name;
      this.contact.Surname = this.Surname;
      this.contact.Email = this.Email;
      this.contact.Mobile = this.Mobile;
      this.contact.MobileInt = this.MobileInt;
      this.contactService.putContact(this.contact);
    }
    this.edit = toggle;
  }
  onSubmit(formValue: any) {
    console.log(formValue);
  }
}