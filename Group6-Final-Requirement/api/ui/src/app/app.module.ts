import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; // Import CommonModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddDataComponent } from './components/add-data/add-data.component';
import { UpdateDataComponent } from './components/update-data/update-data.component';
import { ViewDataComponent } from './components/view-data/view-data.component';
import { HomeComponent } from './components/home/home.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router'; // Import RouterModule for Angular routing

@NgModule({
  declarations: [
    AppComponent,
    ViewDataComponent,
    UpdateDataComponent,
    HomeComponent,
    AddDataComponent,
    ContactUsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule,
    MatChipsModule,
    CommonModule,
    RouterModule // Add RouterModule for Angular routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
