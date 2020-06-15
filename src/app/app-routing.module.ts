import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateContactComponent } from './components/create-contact/create-contact.component';
import { MainContactComponent } from './components/main-contact/main-contact.component';
import { ViewContactComponent } from './components/view-contact/view-contact.component';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';

const routes: Routes = [
  {path: '', component: MainContactComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: MainContactComponent},
  {path: 'create', component: CreateContactComponent},
  {path: 'view/:id', component: ViewContactComponent},
  {path: 'edit/:id', component: EditContactComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
