import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; 
import { environment } from '../../../environments/environment';
import { Contact } from '../../models/contact';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.scss'],
  providers: [ContactService]
})
export class ViewContactComponent implements OnInit {

  public title: string;
  public contact?: Contact;
  public contactDelete?: Contact;
  public role: string;


  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _contactService: ContactService,
  ){
    this.title = 'Detalles del Contacto';
    this.url = environment.host.api;
  }

  ngOnInit() {
    this.getContact();
  }

  getContact(){
      this._route.params.forEach((params: Params) => {
        let id = params['id'];

        this._contactService.getContact(id).subscribe(
            res => {
              if(!res.contact) {
                this._router.navigate(['/']);
              } else {
                this.contact = res.contact;
                this.contact.phones = JSON.parse(res.contact.phones);
                this.contact.email = JSON.parse(res.contact.email);
                this.contact.custom_field = JSON.parse(res.contact.custom_field);
                console.log(this.contact);
                
              }      
            },
            error => {
              var errorMessage = <any>error;
              this._router.navigate(['/']);
      
              if(errorMessage != null){
                console.log(errorMessage);
              } 
            }
          );
      });
  }

  openModalDelete(){
    this.contactDelete = this.contact;
  }

}
