import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Contact } from '../models/contact';


@Injectable()

export class ContactService {

    public url: string;

    constructor(private _http: HttpClient){
        this.url = environment.host.api;
    }

    getContacts(): Observable<any>{
        let headers = new HttpHeaders({'Content-type':'application/json'});
        let options = new HttpResponse({headers: headers});

        return this._http.get(
            this.url + 'contacts', 
            options
        );
    }

    addContact(contact): Observable<any> {
        let params = JSON.stringify(contact);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this._http.post(
            this.url + 'contact',
            params,
            {headers: headers}
        );

    }

    getContact(id): Observable<any>{
        let headers = new HttpHeaders({'Content-type':'application/json'});
        let options = new HttpResponse({headers: headers});

        return this._http.get(
            this.url + 'contact/' + id, 
            options
        );
    }

    editContact(id, contact): Observable<any> {
        let params =  JSON.stringify(contact);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this._http.put(
            this.url + 'contact/' + id,
            params,
            {headers: headers}
        )
    }

    deleteContact(id): Observable<any> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        let options = new HttpResponse({headers: headers});

        return this._http.delete(
            this.url + 'contact/' + id,
            options
        );
    }

}