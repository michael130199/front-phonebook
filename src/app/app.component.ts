import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  title: string;
  url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
  ){
    this.title = 'Agenda Telefónica';
    this.url = environment.host.api;
  }

  ngOnInit() {
  }


}
