import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.component.html',
  styleUrls: ['./update-data.component.scss']
})
export class UpdateDataComponent implements OnInit {
  updateForm!: FormGroup;
  pronounID!: any;
  pronoun: any = {}; // Initialize pronoun object
  isLoading = false; // Add isLoading flag for better UI feedback

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pronounID = this.route.snapshot.paramMap.get('id');
    this.updateForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      contactDetails: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      preferredPronoun: ['', Validators.required]
    });
  
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.dataService.getSelectedUserData(this.pronounID).subscribe(
      (res: any) => {
        console.log(res);
        this.pronoun = res || {}; // Ensure pronoun object is not null or undefined
        this.populateForm();
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching user data:', error);
        this.isLoading = false;
      }
    );
  }
  
  populateForm() {
    // Patch the form with fetched data
    this.updateForm.patchValue({
      fullName: this.pronoun.fullName || '', // Use default value if null or undefined
      contactDetails: this.pronoun.contactDetails || '',
      emailAddress: this.pronoun.emailAddress || '',
      preferredPronoun: this.pronoun.preferredPronoun || ''
    });
  }

  updatePronoun() {
    console.log('Update Pronoun function called.'); // Debugging statement
  
    const updatedData = this.updateForm.value;
    console.log('Updated Data:', updatedData); // Log the data being sent in the request
  
    this.dataService.updateUserData(this.pronounID, updatedData).subscribe(
      (res: any) => {
        console.log('User data updated successfully:', res); // Log the response from the server
        // You can add any success handling here, such as showing a success message
  
        // Redirect to view-data page upon successful update
        this.router.navigate(['/view-data']);
      },
      (error) => {
        console.error('Error updating user data:', error); // Log the error response
        // You can handle errors here, such as displaying an error message to the user
      }
    );
  }
}
