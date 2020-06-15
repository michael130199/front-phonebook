import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Contact } from '../../models/contact';
import { ContactService } from '../../services/contact.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-main-contact',
  templateUrl: './main-contact.component.html',
  styleUrls: ['./main-contact.component.scss'],
  providers: [ContactService]
})
export class MainContactComponent implements OnInit {

  title: string;
  url: string;
  show = {
    phones: false
  };
  public contacts: Contact;

  constructor(
    private _contactService: ContactService,
    private _route: ActivatedRoute,
    private _router: Router,
  ){
    this.title = 'Agenda Telefónica';
    this.url = environment.host.api;
  }

  ngOnInit() {
    this.getContacts();
  }

  getContacts(){
    this._contactService.getContacts().subscribe(
      res => {
        if(!res.contacts) {
          this.contacts = null;
        } else {
          this.contacts = res.contacts;

          
          res.contacts.forEach( (contact, index) => {
            this.contacts[index].phones = JSON.parse(contact.phones);
            this.contacts[index].email = JSON.parse(contact.email);
            this.contacts[index].custom_field = JSON.parse(contact.custom_field);
          });
          console.log(this.contacts);
          this.show.phones= true;
        }      
      },
      error => {
        var errorMessage = <any>error;
      }
    );
  }


}
