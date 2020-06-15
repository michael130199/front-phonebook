import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../../models/contact';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'modal-delete',
  templateUrl: './modal-delete.component.html'
})
export class ModalDeleteComponent {

  @Input() contact: Contact;
  title: string;

  constructor(
    private _router: Router,
    private _contactService: ContactService,
  ){
    this.title = 'modal';
    this.contact = new Contact(null, '', '', '', '', '', '', '', '', '');
  }

  contactDelete(){
    let id = this.contact._id;

    this._contactService.deleteContact(id).subscribe(
      res => {
        if(!res.contact) {
          this._router.navigate(['/']);
          console.log('Se elimino');
        } else {
          this._router.navigate(['/']);
          console.log('no se borro el contact');
        }
      },
      error => {
        console.log(error);
      }    
    );
  }

}
