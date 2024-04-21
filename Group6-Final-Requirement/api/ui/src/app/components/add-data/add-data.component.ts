import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent {
  title = 'pronounsapp';
  readonly APIUrl = "http://localhost:5038/api/pronouns/";

  constructor(private http: HttpClient) { }

  pronouns: any = [];

  refreshPronouns() {
    this.http.get(this.APIUrl + 'GetPronouns').subscribe(data => {
      this.pronouns = data;
    });
  }

  ngOnInit() {
    this.refreshPronouns();
  }

  addPronoun() {
    const fullName = (document.getElementById("fullName") as HTMLInputElement).value;
    const contactDetails = (document.getElementById("contactDetails") as HTMLInputElement).value;
    const emailAddress = (document.getElementById("emailAddress") as HTMLInputElement).value;
    const preferredPronoun = (document.getElementById("preferredPronoun") as HTMLSelectElement).value;
  
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("contactDetails", contactDetails);
    formData.append("emailAddress", emailAddress);
    formData.append("preferredPronoun", preferredPronoun);
  
    this.http.post(this.APIUrl + 'AddPronoun', formData).subscribe({
      next: (data) => {
        console.log('Response from server:', data);
        alert('Pronoun added successfully!');
        this.refreshPronouns(); // Refresh the list of pronouns after adding a new one
        this.resetFormInputs(); // Reset the form inputs
      },
      error: (error) => {
        console.error('Error adding pronoun:', error);
        alert('Failed to add pronoun. Please try again.');
      }
    });
  }
  
  resetFormInputs() {
    (document.getElementById("fullName") as HTMLInputElement).value = '';
    (document.getElementById("contactDetails") as HTMLInputElement).value = '';
    (document.getElementById("emailAddress") as HTMLInputElement).value = '';
    (document.getElementById("preferredPronoun") as HTMLSelectElement).value = '';
  }

  deletePronoun(id: any) {
    this.http.delete(this.APIUrl + 'DeletePronoun?id=' + id).subscribe(data => {
      alert(data);
      this.refreshPronouns();
    });
  }
}
