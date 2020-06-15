import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateContactComponent } from './components/create-contact/create-contact.component';
import { MainContactComponent } from './components/main-contact/main-contact.component';
import { ViewContactComponent } from './components/view-contact/view-contact.component';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';
import { ModalDeleteComponent } from './components/modal-delete/modal-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateContactComponent,
    MainContactComponent,
    ViewContactComponent,
    EditContactComponent,
    ModalDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  exports: [
    ModalDeleteComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
