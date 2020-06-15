import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { environment } from '../../../environments/environment';
import { Contact } from '../../models/contact';
import { ContactService } from '../../services/contact.service';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss'],
  providers: [ContactService, UploadService]
})
export class CreateContactComponent{

  public title: string;
  public contact: Contact;
  public phones;
  public emails;
  public custom_field;
  public show;
  public url: string;
  public status: string;
  public message: string;
  public filesToUpload: Array<File>;

  constructor(
    private _contactService: ContactService,
    private _uploadService: UploadService,
    private _router: Router,
  ) {
    this.title = 'Agregar un Contacto';
    this.contact = new Contact(null, '', '', '', '', '', '', '', '', '');
    this.phones = [{number: '', tag: ''}];
    this.emails = [{name: '', tag: ''}];
    this.custom_field = [{name: '', tag: ''}];
    this.show = {
      plus_custom: false
    }

    this.url = environment.host.api;
  }

  onSubmit() {

    this.contact.phones = JSON.stringify(this.phones); 
    this.contact.email = JSON.stringify(this.emails); 
    this.contact.custom_field = JSON.stringify(this.custom_field); 

    this._contactService.addContact(this.contact).subscribe(
      res => {
        if(!res.contact) {
          this.status = "error";
          this.message = 'no se ha agregado el contact1';

        }else{
          this.status = 'success';
          this.contact = res.contact;

          if(!this.filesToUpload){
            this._router.navigate(['/home']);
          } else {
            this._uploadService.makeFileRequest(
              this.url + 'contact/' + this.contact._id + '/upload-image',
              [],
              this.filesToUpload,
              'image'
            ).then( (result: any) => {
              this.contact.image = result.image;
              console.log(this.contact);
              this._router.navigate(['/home']);
            });
          }
        }
      },
      error => {
        var errorMessage = <any>error;

        if(errorMessage != null){
          this.status = 'error';
          this.message = 'no se ha agregado el contact';
        } 
      }
    );

    console.log("datos enviados");

  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;

    let reader = new FileReader();

    reader.onload = function(theFile: Event) {

      let port = document.getElementById("port");
      let image = document.getElementById("img");

      if(image != null) {
        port.removeChild(image);
      }

      let img = document.createElement("img");
      img.src = "" + reader.result;
      img.id = "img";
      img.className = "image";
      img.style.display = "block";
      img.style.width = "25%";
      img.style.margin = "0px auto";

      port.insertBefore(img, null);
    }

    reader.readAsDataURL(this.filesToUpload[0]);
    console.log(this.filesToUpload);
  }

  addField(type){


    switch (type) {
      case 0:
        this.phones.push({number: '', tag: null});
        break;

      case 1:
        this.emails.push({name: '', tag: null});
        break;
      
      case 2:    
        this.custom_field.push({name: '', tag: null});
        break;
    }
  
  }

  deleteField(type, index){
    if( index >= 0 ){
      switch (type) {
        case 0:
          this.phones.splice(index, 1);
          break;

        case 1:
          this.emails.splice(index, 1);
          break;
        
        case 2:    
          this.custom_field.splice(index, 1);
          break;
      }
    }
  }

}
