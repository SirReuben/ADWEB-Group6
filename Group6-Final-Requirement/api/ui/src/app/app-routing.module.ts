import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
import { HomeComponent } from './components/home/home.component';
import { ViewDataComponent } from './components/view-data/view-data.component';
import { AddDataComponent } from './components/add-data/add-data.component';
import { UpdateDataComponent } from './components/update-data/update-data.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'view-data', component: ViewDataComponent },
  { path: 'add-data', component: AddDataComponent },
  { path: 'update-data/:id', component: UpdateDataComponent },
  { path: 'contact-us', component: ContactUsComponent }
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
 
export class AppRoutingModule { }