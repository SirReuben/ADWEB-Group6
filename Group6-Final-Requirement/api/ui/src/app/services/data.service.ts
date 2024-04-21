import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pronoun } from './Pronoun';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:5038/api/pronouns'; // API URL
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
    // Add any other headers you need
  });
  selectedUserData: any; // Declare selectedUserData property

  constructor(private httpClient: HttpClient) { }

  setSelectedUserData(userData: any) {
    this.selectedUserData = userData;
  }

  getSelectedUserData(pronounID: any): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/update-data/${pronounID}`);
  }

  updateUserData(pronounID: any, updatedData: any): Observable<any> {
    const API_URL = `${this.apiUrl}/update-data/${pronounID}`;
    return this.httpClient.put(API_URL, updatedData, { headers: this.httpHeaders })
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred while updating user data:', error);
          return throwError(error);
        })
      );
  }

  // updatePronoun(inputData: object, pronounID: any){
  //   return this.httpClient.put(`${this.apiUrl}/update-data/${pronounID}`, inputData);
  // }

  // private handleError(error: any) {
  //   console.error('An error occurred:', error);
  //   return throwError(error);
  // }
}
