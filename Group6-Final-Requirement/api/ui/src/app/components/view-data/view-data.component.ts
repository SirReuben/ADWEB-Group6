import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.scss']
})
export class ViewDataComponent implements OnInit {
  title = 'pronounsapp';
  readonly APIUrl = 'http://localhost:5038/api/pronouns/';

  pronouns: any[] = []; // Ensure pronouns array is typed correctly

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.refreshPronouns();
  }

  refreshPronouns() {
    this.http.get<any[]>(this.APIUrl + 'GetPronouns').subscribe(
      (data) => {
        this.pronouns = data;
      },
      (error) => {
        console.error('Error fetching pronouns:', error);
        // You can handle the error here, such as showing an error message to the user
      }
    );
  }

  deletePronoun(id: any) {
    this.http.delete(this.APIUrl + 'DeletePronoun?id=' + id).subscribe(
      (data) => {
        alert('Pronoun deleted successfully.');
        this.refreshPronouns();
      },
      (error) => {
        console.error('Error deleting pronoun:', error);
        // Handle error as needed
      }
    );
  }

  navigateToUpdate(id: any) {
    this.router.navigate(['/update-data', id]); // Assuming the route for update-data component accepts an ID parameter
  }
}
