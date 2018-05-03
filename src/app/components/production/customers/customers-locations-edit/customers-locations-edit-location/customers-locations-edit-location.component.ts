import { CustomersService } from '../../customers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers-locations-edit-location',
  templateUrl: './customers-locations-edit-location.component.html',
  styleUrls: ['./customers-locations-edit-location.component.css']
})
export class CustomersLocationsEditLocationComponent implements OnInit {
  customerIndex: number;
  customerDbId: string;
  locationIndex: number;
  locationDbId: string;
  editMode= false;
  locationForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private customersService: CustomersService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.customerIndex = +params['customerIndex'];
        this.customerDbId = this.customersService.getCustomer(this.customerIndex)._id;
        this.locationIndex = +params['locationIndex'];
        console.log(params);
        this.editMode = params['locationIndex'] != null;
        this.initForm();
      }
    )
  }

  private initForm() {
    let locationName = '';
    let locationType = 'Base';
    console.log("Before " + this.customerDbId);
    let locationCountry = this.customerDbId;
    let locationCity = '';
    let locationState = '';

    if(this.editMode){
      const location = this.customersService.getCustomerLocation(this.customerIndex, this.locationIndex);
      locationName = location.name;
      if(location.locationType){locationType = location.locationType;}
      locationCountry = location.country;
      locationCity = location.city;
      locationState = location.state;
    }

    this.locationForm = new FormGroup({
      'name': new FormControl(locationName, Validators.required),
      'locationType': new FormControl(locationType, Validators.required),
      'country': new FormControl(locationCountry, Validators.required),
      'city': new FormControl(locationCity, Validators.required),
      'state': new FormControl(locationState, Validators.required)
    });
    console.log(this.locationForm);
  }

  onSubmit(){
    if(this.editMode) {
      this.customersService.updateLocation(this.customerIndex,this.locationIndex, this.locationForm.value)
        .subscribe(
          (response) => console.log(response)
        )
    } else {
      this.customersService.addLocation(this.customerIndex, this.locationForm.value)
        .subscribe(
          (response) => console.log(response)
        );
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../../'], {relativeTo: this.route});
  }

}
